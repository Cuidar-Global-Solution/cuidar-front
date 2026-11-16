
import { useState } from 'react'
import {
  ArrowLeft,
  BriefcaseBusiness,
  Heart,
  LockKeyhole,
  Mail,
  MapPin,
  Phone,
  UserRound,
} from 'lucide-react'
import { Link } from 'react-router-dom'

export default function CadastroCuidador() {
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [telefone, setTelefone] = useState('')
  const [cidade, setCidade] = useState('')
  const [experiencia, setExperiencia] = useState('')
  const [formacao, setFormacao] = useState('')
  const [senha, setSenha] = useState('')
  const [confirmarSenha, setConfirmarSenha] = useState('')

  return (
    <main className="flex min-h-screen bg-brand-background lg:h-dvh lg:min-h-0 lg:overflow-hidden">
      <section className="relative hidden w-1/2 flex-col justify-between overflow-hidden bg-brand-dark p-12 text-white lg:flex xl:p-16">
        <Link to="/" className="relative z-10 flex w-fit items-center gap-3">
          <img src="/assets/img01-logo-cuidar.jpeg" alt="Cuidar+" className="h-12 w-12 rounded-xl object-cover" />
          <span className="text-2xl font-bold">Cuidar<span className="text-brand-pink">+</span></span>
        </Link>

        <div className="relative z-10 max-w-lg">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-sm font-semibold text-white/80">
            <Heart size={16} className="text-brand-pink" />
            Para profissionais
          </span>
          <h1 className="mt-8 text-4xl font-bold leading-tight text-white xl:text-5xl">
            Seu trabalho também faz parte dessa rede de cuidado.
          </h1>
          <p className="mt-6 text-base leading-8 text-white/70">
            Apresente sua experiência, compartilhe sua formação e aproxime-se de famílias que procuram apoio para cuidar de quem importa.
          </p>
        </div>

        <p className="relative z-10 text-sm text-white/60">
          Sua experiência pode fazer a diferença na vida de alguém.
        </p>
        <div className="pointer-events-none absolute -bottom-40 -left-32 h-96 w-96 rounded-full border border-white/10" />
        <div className="pointer-events-none absolute -bottom-24 -left-16 h-64 w-64 rounded-full border border-white/10" />
      </section>

      <section className="flex min-h-screen w-full items-center justify-center px-5 py-10 sm:px-8 lg:h-full lg:w-1/2 lg:overflow-y-auto lg:px-12 lg:py-8">
        <div className="w-full max-w-md">
          <Link to="/cadastro" className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-brand-muted transition hover:text-brand-primary">
            <ArrowLeft size={17} />
            Voltar à escolha de perfil
          </Link>

          <div className="mb-8 lg:hidden">
            <img src="/assets/img01-logo-cuidar.jpeg" alt="Cuidar+" className="h-12 w-12 rounded-xl object-cover" />
          </div>

          <div>
            <span className="text-sm font-bold uppercase tracking-[0.16em] text-brand-pink">Cadastro de cuidador</span>
            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">Crie seu perfil</h2>
            <p className="mt-3 text-sm leading-7 text-brand-muted">
              Informe seus dados e algumas informações sobre sua atuação profissional.
            </p>
          </div>

          <form className="mt-8 space-y-5">
            <div>
              <label htmlFor="nome" className="mb-2 block text-sm font-semibold text-brand-ink">Nome completo</label>
              <div className="relative">
                <UserRound size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-muted" />
                <input id="nome" name="nome" type="text" value={nome} onChange={(event) => setNome(event.target.value)} placeholder="Digite seu nome completo" className="w-full rounded-xl border border-brand-border bg-white py-3.5 pl-11 pr-4 text-sm outline-none transition placeholder:text-brand-muted/70 focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/10" />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-semibold text-brand-ink">E-mail</label>
              <div className="relative">
                <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-muted" />
                <input id="email" name="email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="seuemail@exemplo.com" className="w-full rounded-xl border border-brand-border bg-white py-3.5 pl-11 pr-4 text-sm outline-none transition placeholder:text-brand-muted/70 focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/10" />
              </div>
            </div>

            <div>
              <label htmlFor="telefone" className="mb-2 block text-sm font-semibold text-brand-ink">Telefone</label>
              <div className="relative">
                <Phone size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-muted" />
                <input id="telefone" name="telefone" type="tel" value={telefone} onChange={(event) => setTelefone(event.target.value)} placeholder="(00) 00000-0000" className="w-full rounded-xl border border-brand-border bg-white py-3.5 pl-11 pr-4 text-sm outline-none transition placeholder:text-brand-muted/70 focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/10" />
              </div>
            </div>

            <div>
              <label htmlFor="cidade" className="mb-2 block text-sm font-semibold text-brand-ink">Cidade</label>
              <div className="relative">
                <MapPin size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-muted" />
                <input id="cidade" name="cidade" type="text" value={cidade} onChange={(event) => setCidade(event.target.value)} placeholder="Ex.: São Paulo - SP" className="w-full rounded-xl border border-brand-border bg-white py-3.5 pl-11 pr-4 text-sm outline-none transition placeholder:text-brand-muted/70 focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/10" />
              </div>
            </div>

            <div>
              <label htmlFor="experiencia" className="mb-2 block text-sm font-semibold text-brand-ink">Tempo de experiência</label>
              <div className="relative">
                <BriefcaseBusiness size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-muted" />
                <select id="experiencia" name="experiencia" value={experiencia} onChange={(event) => setExperiencia(event.target.value)} className="w-full appearance-none rounded-xl border border-brand-border bg-white py-3.5 pl-11 pr-4 text-sm text-brand-ink outline-none transition focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/10">
                  <option value="" disabled>Selecione seu tempo de experiência</option>
                  <option value="sem-experiencia">Ainda não tenho experiência</option>
                  <option value="menos-1-ano">Menos de 1 ano</option>
                  <option value="1-3-anos">De 1 a 3 anos</option>
                  <option value="3-5-anos">De 3 a 5 anos</option>
                  <option value="mais-5-anos">Mais de 5 anos</option>
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="formacao" className="mb-2 block text-sm font-semibold text-brand-ink">Formação ou cursos na área</label>
              <textarea id="formacao" name="formacao" rows={3} value={formacao} onChange={(event) => setFormacao(event.target.value)} placeholder="Conte se possui cursos, capacitações ou formação na área." className="w-full resize-none rounded-xl border border-brand-border bg-white px-4 py-3.5 text-sm outline-none transition placeholder:text-brand-muted/70 focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/10" />
            </div>

            <div>
              <label htmlFor="senha" className="mb-2 block text-sm font-semibold text-brand-ink">Senha</label>
              <div className="relative">
                <LockKeyhole size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-muted" />
                <input id="senha" name="senha" type="password" value={senha} onChange={(event) => setSenha(event.target.value)} placeholder="Crie uma senha" className="w-full rounded-xl border border-brand-border bg-white py-3.5 pl-11 pr-4 text-sm outline-none transition placeholder:text-brand-muted/70 focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/10" />
              </div>
            </div>

            <div>
              <label htmlFor="confirmarSenha" className="mb-2 block text-sm font-semibold text-brand-ink">Confirmar senha</label>
              <div className="relative">
                <LockKeyhole size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-muted" />
                <input id="confirmarSenha" name="confirmarSenha" type="password" value={confirmarSenha} onChange={(event) => setConfirmarSenha(event.target.value)} placeholder="Digite sua senha novamente" className="w-full rounded-xl border border-brand-border bg-white py-3.5 pl-11 pr-4 text-sm outline-none transition placeholder:text-brand-muted/70 focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/10" />
              </div>
            </div>

            <button type="submit" className="w-full rounded-xl bg-brand-primary px-5 py-3.5 text-sm font-bold text-white transition hover:bg-brand-dark">
              Criar conta de cuidador
            </button>
          </form>

          <p className="mt-7 text-center text-sm text-brand-muted">
            Já tem uma conta? <Link to="/login" className="font-bold text-brand-primary transition hover:text-brand-pink">Entrar</Link>
          </p>
        </div>
      </section>
    </main>
  )
}
