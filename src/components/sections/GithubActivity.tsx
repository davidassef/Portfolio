'use client';

import { useEffect, useState } from 'react';
import { Github, Star, GitFork, Users, Folder, Loader2 } from 'lucide-react';

interface GithubStats {
    publicRepos: number;
    followers: number;
    following: number;
    totalStars: number;
    totalForks: number;
}

interface Repo {
    id: number;
    name: string;
    description: string | null;
    language: string | null;
    stars: number;
    forks: number;
    updatedAt: string;
    url: string;
}

interface GithubActivityProps {
    locale: string;
}

export default function GithubActivity({ locale }: GithubActivityProps) {
    const [stats, setStats] = useState<GithubStats | null>(null);
    const [repos, setRepos] = useState<Repo[]>([]);
    const [loading, setLoading] = useState(true);
    const username = 'davidassef';

    useEffect(() => {
        const fetchGithubData = async () => {
            try {
                // Busca perfil do usuário
                const profileResponse = await fetch(`https://api.github.com/users/${username}`);
                if (!profileResponse.ok) throw new Error('Failed to fetch profile');
                const profile = await profileResponse.json();

                // Busca repositórios
                const reposResponse = await fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`);
                if (!reposResponse.ok) throw new Error('Failed to fetch repos');
                const reposData = await reposResponse.json();

                // Calcula estatísticas
                const totalStars = reposData.reduce((sum: number, repo: any) => sum + repo.stargazers_count, 0);
                const totalForks = reposData.reduce((sum: number, repo: any) => sum + repo.forks_count, 0);

                setStats({
                    publicRepos: profile.public_repos,
                    followers: profile.followers,
                    following: profile.following,
                    totalStars,
                    totalForks
                });

                // Pega os 6 repositórios mais recentes atualizados
                const recentRepos = reposData
                    .slice(0, 6)
                    .map((repo: any) => ({
                        id: repo.id,
                        name: repo.name,
                        description: repo.description,
                        language: repo.language,
                        stars: repo.stargazers_count,
                        forks: repo.forks_count,
                        updatedAt: repo.updated_at,
                        url: repo.html_url
                    }));
                setRepos(recentRepos);
            } catch (error) {
                console.error('Erro ao buscar dados do GitHub:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchGithubData();
    }, [username]);

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffTime = Math.abs(now.getTime() - date.getTime());
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

        if (locale === 'en') {
            if (diffDays === 0) return 'today';
            if (diffDays === 1) return 'yesterday';
            if (diffDays < 7) return `${diffDays} days ago`;
            if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
            return `${Math.floor(diffDays / 30)} months ago`;
        } else {
            if (diffDays === 0) return 'hoje';
            if (diffDays === 1) return 'ontem';
            if (diffDays < 7) return `${diffDays} dias atrás`;
            if (diffDays < 30) return `${Math.floor(diffDays / 7)} semanas atrás`;
            return `${Math.floor(diffDays / 30)} meses atrás`;
        }
    };

    const texts = {
        title: locale === 'en' ? 'GitHub Activity' : 'Atividade no GitHub',
        subtitle: locale === 'en' ? 'My latest contributions and repositories' : 'Minhas últimas contribuições e repositórios',
        stats: {
            repos: locale === 'en' ? 'Repositories' : 'Repositórios',
            followers: locale === 'en' ? 'Followers' : 'Seguidores',
            stars: locale === 'en' ? 'Total Stars' : 'Estrelas Totais',
            forks: locale === 'en' ? 'Total Forks' : 'Forks Totais'
        },
        recentRepos: locale === 'en' ? 'Recent Repositories' : 'Repositórios Recentes',
        viewProfile: locale === 'en' ? 'View Profile' : 'Ver Perfil',
        noDescription: locale === 'en' ? 'No description' : 'Sem descrição'
    };

    if (loading) {
        return (
            <section className="py-20 bg-[var(--bg-secondary)]">
                <div className="container">
                    <div className="text-center">
                        <Loader2 className="w-8 h-8 mx-auto animate-spin text-[var(--accent-cyan)]" />
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="py-20 bg-[var(--bg-secondary)]">
            <div className="container">
                {/* Header */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        <span className="text-gradient">{texts.title}</span>
                    </h2>
                    <p className="text-[var(--text-muted)] max-w-2xl mx-auto">
                        {texts.subtitle}
                    </p>
                    <a
                        href={`https://github.com/${username}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 mt-6 px-6 py-3 rounded-full bg-[var(--accent-cyan)]/10 text-[var(--accent-cyan)] hover:bg-[var(--accent-cyan)]/20 transition-colors"
                    >
                        <Github size={20} />
                        @{username}
                    </a>
                </div>

                {stats && (
                    /* Stats Cards */
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
                        <div className="p-6 rounded-2xl bg-[var(--bg-primary)] border border-[var(--border-subtle)] hover:border-[var(--accent-cyan)]/50 transition-colors">
                            <div className="flex items-center gap-3 mb-2">
                                <Folder className="text-[var(--accent-cyan)]" size={20} />
                                <span className="text-2xl font-bold">{stats.publicRepos}</span>
                            </div>
                            <p className="text-sm text-[var(--text-muted)]">{texts.stats.repos}</p>
                        </div>

                        <div className="p-6 rounded-2xl bg-[var(--bg-primary)] border border-[var(--border-subtle)] hover:border-[var(--accent-cyan)]/50 transition-colors">
                            <div className="flex items-center gap-3 mb-2">
                                <Users className="text-[var(--accent-cyan)]" size={20} />
                                <span className="text-2xl font-bold">{stats.followers}</span>
                            </div>
                            <p className="text-sm text-[var(--text-muted)]">{texts.stats.followers}</p>
                        </div>

                        <div className="p-6 rounded-2xl bg-[var(--bg-primary)] border border-[var(--border-subtle)] hover:border-[var(--accent-cyan)]/50 transition-colors">
                            <div className="flex items-center gap-3 mb-2">
                                <Star className="text-[var(--accent-yellow)]" size={20} />
                                <span className="text-2xl font-bold">{stats.totalStars}</span>
                            </div>
                            <p className="text-sm text-[var(--text-muted)]">{texts.stats.stars}</p>
                        </div>

                        <div className="p-6 rounded-2xl bg-[var(--bg-primary)] border border-[var(--border-subtle)] hover:border-[var(--accent-cyan)]/50 transition-colors">
                            <div className="flex items-center gap-3 mb-2">
                                <GitFork className="text-[var(--accent-purple)]" size={20} />
                                <span className="text-2xl font-bold">{stats.totalForks}</span>
                            </div>
                            <p className="text-sm text-[var(--text-muted)]">{texts.stats.forks}</p>
                        </div>
                    </div>
                )}

                {/* Recent Repos */}
                {repos.length > 0 && (
                    <div>
                        <h3 className="text-xl font-semibold mb-6 text-center">{texts.recentRepos}</h3>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {repos.map((repo) => (
                                <a
                                    key={repo.id}
                                    href={repo.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-5 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-subtle)] hover:border-[var(--accent-cyan)]/50 transition-all hover:shadow-lg hover:shadow-[var(--accent-cyan)]/5 group"
                                >
                                    <div className="flex items-start justify-between mb-3">
                                        <h4 className="font-semibold text-[var(--text-primary)] group-hover:text-[var(--accent-cyan)] transition-colors">
                                            {repo.name}
                                        </h4>
                                        <Github size={16} className="text-[var(--text-muted)] group-hover:text-[var(--accent-cyan)] transition-colors" />
                                    </div>
                                    <p className="text-sm text-[var(--text-muted)] mb-4 line-clamp-2">
                                        {repo.description || texts.noDescription}
                                    </p>
                                    <div className="flex items-center justify-between text-xs text-[var(--text-muted)]">
                                        {repo.language && (
                                            <span className="flex items-center gap-1">
                                                <span className="w-2 h-2 rounded-full bg-[var(--accent-cyan)]" />
                                                {repo.language}
                                            </span>
                                        )}
                                        <span className="flex items-center gap-1">
                                            <Star size={12} />
                                            {repo.stars}
                                        </span>
                                        <span>{formatDate(repo.updatedAt)}</span>
                                    </div>
                                </a>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}
