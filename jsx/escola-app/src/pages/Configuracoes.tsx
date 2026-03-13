import React, { useState } from 'react'
import { School, Bell, Shield, Palette, Save } from 'lucide-react'

export default function Configuracoes() {
  const [nomeEscola, setNomeEscola] = useState('Colégio EduPrime')
  const [email, setEmail] = useState('contato@eduprime.com.br')
  const [telefone, setTelefone] = useState('(11) 3000-0000')
  const [notifEmail, setNotifEmail] = useState(true)
  const [notifPush, setNotifPush] = useState(true)
  const [notifInad, setNotifInad] = useState(true)

  const Toggle = ({ value, onChange }: { value: boolean; onChange: (v: boolean) => void }) => (
    <button
      onClick={() => onChange(!value)}
      className={`relative w-11 h-6 rounded-full transition-colors duration-200 ${value ? 'bg-brand-500' : 'bg-white/10'}`}
    >
      <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform duration-200 ${value ? 'translate-x-6' : 'translate-x-1'}`} />
    </button>
  )

  return (
    <div className="space-y-5 animate-fade-in opacity-0 max-w-2xl" style={{ animationFillMode: 'forwards' }}>
      {/* Dados da Escola */}
      <div className="card p-5">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-9 h-9 rounded-xl bg-brand-500/15 flex items-center justify-center text-brand-400">
            <School size={17} />
          </div>
          <div>
            <h3 className="font-display font-semibold text-white text-sm">Dados da Escola</h3>
            <p className="text-white/30 text-xs">Informações gerais da instituição</p>
          </div>
        </div>
        <div className="space-y-3">
          <div>
            <label className="text-white/40 text-xs mb-1.5 block">Nome da Escola</label>
            <input className="input-field" value={nomeEscola} onChange={e => setNomeEscola(e.target.value)} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-white/40 text-xs mb-1.5 block">E-mail</label>
              <input className="input-field" value={email} onChange={e => setEmail(e.target.value)} />
            </div>
            <div>
              <label className="text-white/40 text-xs mb-1.5 block">Telefone</label>
              <input className="input-field" value={telefone} onChange={e => setTelefone(e.target.value)} />
            </div>
          </div>
          <div>
            <label className="text-white/40 text-xs mb-1.5 block">Endereço</label>
            <input className="input-field" placeholder="Rua, número, bairro, cidade" />
          </div>
        </div>
      </div>

      {/* Notificações */}
      <div className="card p-5">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-9 h-9 rounded-xl bg-orange-500/15 flex items-center justify-center text-orange-400">
            <Bell size={17} />
          </div>
          <div>
            <h3 className="font-display font-semibold text-white text-sm">Notificações</h3>
            <p className="text-white/30 text-xs">Configure os alertas do sistema</p>
          </div>
        </div>
        <div className="space-y-4">
          {[
            { label: 'Notificações por e-mail', sub: 'Receba avisos importantes no e-mail', value: notifEmail, onChange: setNotifEmail },
            { label: 'Notificações push', sub: 'Alertas no navegador em tempo real', value: notifPush, onChange: setNotifPush },
            { label: 'Alertas de inadimplência', sub: 'Aviso automático de mensalidades vencidas', value: notifInad, onChange: setNotifInad },
          ].map(item => (
            <div key={item.label} className="flex items-center justify-between p-3 rounded-xl bg-white/3">
              <div>
                <p className="text-white text-sm font-medium">{item.label}</p>
                <p className="text-white/30 text-xs">{item.sub}</p>
              </div>
              <Toggle value={item.value} onChange={item.onChange} />
            </div>
          ))}
        </div>
      </div>

      {/* Segurança */}
      <div className="card p-5">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-9 h-9 rounded-xl bg-emerald-500/15 flex items-center justify-center text-emerald-400">
            <Shield size={17} />
          </div>
          <div>
            <h3 className="font-display font-semibold text-white text-sm">Segurança</h3>
            <p className="text-white/30 text-xs">Gerenciar acesso e senha</p>
          </div>
        </div>
        <div className="space-y-3">
          <div>
            <label className="text-white/40 text-xs mb-1.5 block">Senha atual</label>
            <input type="password" className="input-field" placeholder="••••••••" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-white/40 text-xs mb-1.5 block">Nova senha</label>
              <input type="password" className="input-field" placeholder="••••••••" />
            </div>
            <div>
              <label className="text-white/40 text-xs mb-1.5 block">Confirmar senha</label>
              <input type="password" className="input-field" placeholder="••••••••" />
            </div>
          </div>
        </div>
      </div>

      <button className="btn-primary">
        <Save size={14} />
        Salvar Configurações
      </button>
    </div>
  )
}
