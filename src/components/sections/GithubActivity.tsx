'use client';

import { useEffect, useState } from 'react';
import { Github, Star, GitFork, Users, Folder, Loader2 } from 'lucide-react';

interface GithubStats {
    publicRepos: number;
    followers: number;
    totalStars: number;
    totalForks: number;
}

interface ContributionDay {
    date: string;
    count: number;
    level: number;
}

interface GithubActivityProps {
    locale: string;
}

export default function GithubActivity({ locale }: GithubActivityProps) {
    const [stats, setStats] = useState<GithubStats | null>(null);
    const [contributions, setContributions] = useState<ContributionDay[]>([]);
    const [totalContributions, setTotalContributions] = useState(0);
    const [loading, setLoading] = useState(true);
    const username = 'davidassef';

    useEffect(() => {
        const fetchGithubData = async () => {
            try {
                const [profileRes, eventsRes, reposRes] = await Promise.all([
                    fetch(`https://api.github.com/users/${username}`),
                    fetch(`https://api.github.com/users/${username}/events/public?per_page=100`),
                    fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`)
                ]);

                if (!profileRes.ok || !eventsRes.ok || !reposRes.ok) {
                    throw new Error('Failed to fetch data');
                }

                const profile = await profileRes.json();
                const events = await eventsRes.json();
                const repos = await reposRes.json();

                const totalStars = repos.reduce((sum: number, r: any) => sum + r.stargazers_count, 0);
                const totalForks = repos.reduce((sum: number, r: any) => sum + r.forks_count, 0);

                setStats({
                    publicRepos: profile.public_repos,
                    followers: profile.followers,
                    totalStars,
                    totalForks
                });

                // Criar mapa de contribuições dos últimos 365 dias
                const contributionMap = new Map<string, number>();
                const today = new Date();

                for (let i = 364; i >= 0; i--) {
                    const date = new Date(today);
                    date.setDate(date.getDate() - i);
                    const dateStr = date.toISOString().split('T')[0];
                    contributionMap.set(dateStr, 0);
                }

                events.forEach((event: any) => {
                    if (event.created_at) {
                        const eventDate = new Date(event.created_at).toISOString().split('T')[0];
                        if (contributionMap.has(eventDate)) {
                            contributionMap.set(eventDate, (contributionMap.get(eventDate) || 0) + 1);
                        }
                    }
                });

                const maxContributions = Math.max(...contributionMap.values(), 1);
                const contributionData: ContributionDay[] = Array.from(contributionMap.entries()).map(([date, count]) => ({
                    date,
                    count,
                    level: count === 0 ? 0 : Math.ceil((count / maxContributions) * 4)
                }));

                setContributions(contributionData);
                setTotalContributions(Array.from(contributionMap.values()).reduce((a, b) => a + b, 0));

            } catch (error) {
                console.error('Erro ao buscar dados do GitHub:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchGithubData();
    }, [username]);

    const texts = {
        title: locale === 'en' ? 'GitHub Activity' : 'Atividade no GitHub',
        subtitle: locale === 'en' ? 'My contributions and open source work' : 'Minhas contribuições e trabalho open source',
        stats: {
            repos: locale === 'en' ? 'Repositories' : 'Repositórios',
            followers: locale === 'en' ? 'Followers' : 'Seguidores',
            stars: locale === 'en' ? 'Stars' : 'Estrelas',
            forks: locale === 'en' ? 'Forks' : 'Forks'
        },
        contributions: locale === 'en' ? 'Contributions' : 'Contribuições',
        inLastYear: locale === 'en' ? 'in the last year' : 'no último ano',
        less: locale === 'en' ? 'Less' : 'Menos',
        more: locale === 'en' ? 'More' : 'Mais',
        days: {
            mon: locale === 'en' ? 'Mon' : 'Seg',
            wed: locale === 'en' ? 'Wed' : 'Qua',
            fri: locale === 'en' ? 'Fri' : 'Sex'
        },
        months: locale === 'en'
            ? ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
            : ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']
    };

    const getLevelColor = (level: number) => {
        const colors = [
            'bg-[var(--bg-tertiary)]',
            'bg-[var(--accent-cyan)]/25',
            'bg-[var(--accent-cyan)]/50',
            'bg-[var(--accent-cyan)]/75',
            'bg-[var(--accent-cyan)]'
        ];
        return colors[level] || colors[0];
    };

    // Organiza em semanas (52 semanas x 7 dias)
    const weeks: ContributionDay[][] = [];
    for (let i = 0; i < contributions.length; i += 7) {
        weeks.push(contributions.slice(i, i + 7));
    }

    const getMonthLabel = (weekIndex: number) => {
        if (weekIndex >= weeks.length) return null;
        const day = weeks[weekIndex]?.[0];
        if (!day) return null;
        const date = new Date(day.date);
        if (date.getDate() <= 7) {
            return texts.months[date.getMonth()];
        }
        return null;
    };

    if (loading) {
        return (
            <section className="py-24 bg-[var(--bg-secondary)]">
                <div className="container flex justify-center">
                    <Loader2 className="w-8 h-8 animate-spin text-[var(--accent-cyan)]" />
                </div>
            </section>
        );
    }

    return (
        <section className="py-24 bg-[var(--bg-secondary)]">
            <div className="container px-4">
                {/* Header */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3">
                        <span className="text-gradient">{texts.title}</span>
                    </h2>
                    <p className="text-[var(--text-muted)] max-w-xl mx-auto mb-6">
                        {texts.subtitle}
                    </p>
                    <a
                        href={`https://github.com/${username}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[var(--accent-cyan)]/10 text-[var(--accent-cyan)] hover:bg-[var(--accent-cyan)]/20 transition-colors text-sm font-medium"
                    >
                        <Github size={18} />
                        @{username}
                    </a>
                </div>

                {/* Stats Cards */}
                {stats && (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 max-w-4xl mx-auto mb-12">
                        <div className="flex flex-col items-center p-5 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-subtle)] hover:border-[var(--accent-cyan)]/50 transition-all">
                            <Folder className="text-[var(--accent-cyan)] mb-2" size={20} />
                            <span className="text-2xl md:text-3xl font-bold">{stats.publicRepos}</span>
                            <span className="text-xs text-[var(--text-muted)] mt-1">{texts.stats.repos}</span>
                        </div>

                        <div className="flex flex-col items-center p-5 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-subtle)] hover:border-[var(--accent-cyan)]/50 transition-all">
                            <Users className="text-[var(--accent-cyan)] mb-2" size={20} />
                            <span className="text-2xl md:text-3xl font-bold">{stats.followers}</span>
                            <span className="text-xs text-[var(--text-muted)] mt-1">{texts.stats.followers}</span>
                        </div>

                        <div className="flex flex-col items-center p-5 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-subtle)] hover:border-[var(--accent-cyan)]/50 transition-all">
                            <Star className="text-[var(--accent-yellow)] mb-2" size={20} />
                            <span className="text-2xl md:text-3xl font-bold">{stats.totalStars}</span>
                            <span className="text-xs text-[var(--text-muted)] mt-1">{texts.stats.stars}</span>
                        </div>

                        <div className="flex flex-col items-center p-5 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-subtle)] hover:border-[var(--accent-cyan)]/50 transition-all">
                            <GitFork className="text-[var(--accent-purple)] mb-2" size={20} />
                            <span className="text-2xl md:text-3xl font-bold">{stats.totalForks}</span>
                            <span className="text-xs text-[var(--text-muted)] mt-1">{texts.stats.forks}</span>
                        </div>
                    </div>
                )}

                {/* Contribution Graph */}
                <div className="max-w-4xl mx-auto">
                    <div className="bg-[var(--bg-primary)] rounded-xl border border-[var(--border-subtle)] p-5">
                        <div className="mb-4">
                            <span className="text-sm font-medium">
                                {totalContributions} {texts.contributions} {texts.inLastYear}
                            </span>
                        </div>

                        {/* Grid - alinhado verticalmente */}
                        <div className="overflow-x-auto pb-3">
                            <div className="flex gap-[3px]">
                                {/* Rótulos dos dias - alinhados com as linhas */}
                                <div className="flex flex-col gap-[3px] mr-2 flex-shrink-0">
                                    <div className="h-3"></div>
                                    <div className="h-3 flex items-center text-[10px] text-[var(--text-muted)]">{texts.days.mon}</div>
                                    <div className="h-3"></div>
                                    <div className="h-3 flex items-center text-[10px] text-[var(--text-muted)]">{texts.days.wed}</div>
                                    <div className="h-3"></div>
                                    <div className="h-3 flex items-center text-[10px] text-[var(--text-muted)]">{texts.days.fri}</div>
                                    <div className="h-3"></div>
                                    <div className="h-3"></div>
                                </div>

                                {/* Semanas - alinhadas com os rótulos */}
                                <div className="flex gap-[3px]">
                                    {weeks.map((week, weekIndex) => (
                                        <div key={weekIndex} className="flex flex-col gap-[3px]">
                                            <div className="h-3 flex items-center text-[10px] text-[var(--text-muted)]">
                                                {getMonthLabel(weekIndex)}
                                            </div>
                                            {week.map((day) => (
                                                <div
                                                    key={day.date}
                                                    className={`w-3 h-3 rounded-sm ${getLevelColor(day.level)} transition-all hover:ring-1 hover:ring-[var(--accent-cyan)]`}
                                                    title={`${day.date}: ${day.count} ${locale === 'en' ? 'contributions' : 'contribuições'}`}
                                                />
                                            ))}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Legenda */}
                        <div className="flex items-center justify-end gap-1.5 mt-3 text-[10px] text-[var(--text-muted)]">
                            <span>{texts.less}</span>
                            <div className="w-3 h-3 rounded-sm bg-[var(--bg-tertiary)]" />
                            <div className="w-3 h-3 rounded-sm bg-[var(--accent-cyan)]/25" />
                            <div className="w-3 h-3 rounded-sm bg-[var(--accent-cyan)]/50" />
                            <div className="w-3 h-3 rounded-sm bg-[var(--accent-cyan)]/75" />
                            <div className="w-3 h-3 rounded-sm bg-[var(--accent-cyan)]" />
                            <span>{texts.more}</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
