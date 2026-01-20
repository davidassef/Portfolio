import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data');
const VISITS_FILE = path.join(DATA_DIR, 'visits.json');

interface VisitsData {
    count: number;
    visitors: string[]; // IPs ou identificadores únicos
}

// Inicializa o arquivo de visitas se não existir
async function initVisitsFile(): Promise<VisitsData> {
    try {
        await fs.mkdir(DATA_DIR, { recursive: true });
        await fs.access(VISITS_FILE);
        const content = await fs.readFile(VISITS_FILE, 'utf-8');
        return JSON.parse(content);
    } catch {
        // Arquivo não existe, cria com valores iniciais
        const initialData: VisitsData = { count: 0, visitors: [] };
        await fs.writeFile(VISITS_FILE, JSON.stringify(initialData, null, 2));
        return initialData;
    }
}

// Obtém o identificador único do visitante
function getVisitorId(request: NextRequest): string {
    // Tenta obter o IP real através de vários headers
    const forwardedFor = request.headers.get('x-forwarded-for');
    const realIp = request.headers.get('x-real-ip');
    const cfConnectingIp = request.headers.get('cf-connecting-ip');

    const ip = forwardedFor?.split(',')[0] || realIp || cfConnectingIp || 'unknown';

    // Em desenvolvimento, usa um ID baseado no timestamp para permitir testes
    if (process.env.NODE_ENV === 'development') {
        return `dev-${ip}`;
    }

    return ip;
}

export async function GET(request: NextRequest) {
    try {
        const data = await initVisitsFile();
        const visitorId = getVisitorId(request);

        // Verifica se o visitante já foi contado
        const hasVisited = data.visitors.includes(visitorId);

        // Se ainda não visitou, incrementa o contador
        if (!hasVisited) {
            data.count++;
            data.visitors.push(visitorId);
            await fs.writeFile(VISITS_FILE, JSON.stringify(data, null, 2));
        }

        return NextResponse.json({
            count: data.count,
            isNewVisitor: !hasVisited
        });
    } catch (error) {
        console.error('Erro ao ler/gravar visitas:', error);
        return NextResponse.json({ count: 0, isNewVisitor: false }, { status: 500 });
    }
}

// Endpoint para resetar (opcional, apenas para debug)
export async function DELETE() {
    try {
        await fs.mkdir(DATA_DIR, { recursive: true });
        const initialData: VisitsData = { count: 0, visitors: [] };
        await fs.writeFile(VISITS_FILE, JSON.stringify(initialData, null, 2));
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ success: false }, { status: 500 });
    }
}
