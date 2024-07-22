import {MapPin, Calendar, ArrowRight, UserRoundPlus, Settings2, X, AtSign, Plus, User } from 'lucide-react'
import { FormEvent, useState } from 'react'

export function App() {
  const [isGuestInputOpen, setIsGuestInputOpen] = useState(false)
  const [isGuestModalOpen, setIsGuestModalOpen] = useState(false)
  const [confirmationModalOpen, setConfirmationModalOpen] = useState(false)
  const [emailsToInvite, setEmailsToInvite] = useState(["bruno.p-@hotmail.com", "bruno2@gmail.com"])

  function openGuestInput() {
    setIsGuestInputOpen(true)
  }

  function closeGuestInput() {
    setIsGuestInputOpen(false)
  }

  function openGuestModal() {
    setIsGuestModalOpen(true)
  }

  function closeGuestModal() {
    setIsGuestModalOpen(false)
  }

  function openConfirmationModal() {
    setConfirmationModalOpen(true)
  }

  function closeConfirmationModal() {
    setConfirmationModalOpen(false)
  }

  function addEmail(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const data = new FormData(event.currentTarget)
    const email = data.get('email')?.toString()

    if(!email) {
      return
    }

    setEmailsToInvite([...emailsToInvite, email])

    event.currentTarget.reset()
  }

  function removeEmail(email: string) {
    setEmailsToInvite(emailsToInvite.filter(elem => elem !== email))
  }

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="w-3xl px-6 text-center space-y-10">
        <p className="text-zinc-300 text-lg">Convide seus amigos e planeje sua próxima viagem!</p>

        <div className='space-y-4'>
          <div className="h-16 px-4 bg-zinc-900 flex items-center gap-3 rounded-lg">
            <div className='flex items-center gap-2 flex-1'>
              <MapPin className='size-5 text-zinc-400'/>
              <input disabled={isGuestInputOpen} type="text" placeholder="Para onde vc vai?" className='bg-transparent outline-none' />
            </div>
            <div className='flex items-center gap-2'>
              <Calendar className='size-5  text-zinc-400'/>
              <input disabled={isGuestInputOpen} type="text" placeholder="Quando?" className='bg-transparent outline-none' />
            </div>

            <div className='w-px h-4 bg-zinc-800'/>

            {isGuestInputOpen ? (
            <button onClick={closeGuestInput} className='bg-zinc-200 text-zinc-950 rounded-lg px-5 py-2 font-medium flex items-center gap-1 hover:bg-zinc-400'>
              <Settings2 className='size-5 text-zinc-950' />
              Alterar local/data 
            </button>
            ): (
            <button onClick={openGuestInput} className='bg-lime-300 text-lime-950 rounded-lg px-5 py-2 font-medium flex items-center gap-1 hover:bg-lime-400'>
              Continuar
              <ArrowRight className='size-5 text-lime-950' />
            </button>
            )}
            
          </div>

          { isGuestInputOpen && 
            (
            <div className="h-16 px-4 bg-zinc-900 flex items-center gap-3 rounded-lg">
              <button type='button' onClick={openGuestModal} className='flex items-center gap-2 flex-1'>
                <UserRoundPlus className='size-5 text-zinc-400'/>
                {emailsToInvite.length > 0 ? (
                  <span  className='bg-transparent outline-none  text-zinc-100 text-lg'>{emailsToInvite.length} {
                    emailsToInvite.length > 1 ? 'pessoas convidadas' : 'pessoa convidada'
                  }</span>
                ):
                (
                  <span  className='bg-transparent outline-none  text-zinc-400 text-lg'>Quem estará na viagem?</span>
                )}
                
              </button>

              <div className='w-px h-4 bg-zinc-800'/>

              <button onClick={openConfirmationModal} className='bg-lime-300 text-lime-950 rounded-lg px-5 py-2 font-medium flex items-center gap-1 hover:bg-lime-400'>
                Confirme sua Viagem
                <ArrowRight className='size-5 text-lime-950' />
              </button>
            </div>
            )
          }
        </div>

        <p className="text-zinc-500 text-sm">Ao planejar sua viagem pela planr.er vc automaticamente concorda <br></br>
          com nossos &nbsp;
          <a className="text-zinc-300 underline" href="#">termos de uso</a> 
          &nbsp; e &nbsp;
          <a className="text-zinc-300 underline" href="#">politicas de privacidade</a>
        </p>


      </div>


      {isGuestModalOpen && (
        <div className='fixed inset-0 bg-black/60 flex items-center justify-center'>
          <div className='w-[640px] rounded-xl py-5 px-6 bg-zinc-900 space-y-5'>
            <div className='space-y-2'>
              <div className='flex items-center justify-between'>
                <h2 className='text-lg font-semibold'>Selecionar Convidados</h2>
                <button onClick={closeGuestModal}><X className='size-5 text-zinc-400'/></button>
              </div>

              <p className='text-sm text-zinc-400'>Os Convidados vão receber e-mails para confirmar participação na viagem</p>
            </div>

            <div className="flex flex-wrap gap-2">
              {emailsToInvite.map(email => (
                <div key={email} className="py-1.5 px-2.5 rounded-md bg-zinc-800 flex items-center gap-2">
                  <span className='text-zinc-300'>{email}</span>
                  <button onClick={() => removeEmail(email)} type='button'><X className='size-4'/></button>
                </div>
              ))}
              

            </div>

            <div className="w-full h-px bg-zinc-800"></div>

            <form onSubmit={addEmail} className='p-2.5 bg-zinc-950 border border-zinc-800 rounded-md flex items-center justify-between'>
              <div className="flex items-center gap-2">
                <AtSign className='size-5 text-zinc-400 ' />
                <input type="email" name="email" placeholder="Digite o email do convidado" className='bg-transparent outline-none' />
              </div>
              

              <button type='submit' className='bg-lime-300 text-lime-950 rounded-lg px-5 py-2 font-medium flex items-center gap-1 hover:bg-lime-400'>
                Convidar
                <Plus className='size-5 text-lime-950' />
              </button>
            </form>
          </div>
        </div>
      )}

      {confirmationModalOpen && (
        <div className='fixed inset-0 bg-black/60 flex items-center justify-center'>
          <div className='w-[640px] rounded-xl py-5 px-6 bg-zinc-900 space-y-5'>
            <div className='space-y-2'>
              <div className='flex items-center justify-between'>
                <h2 className='text-lg font-semibold'>Confirmar criação de Viagem</h2>
                <button onClick={closeConfirmationModal}><X className='size-5 text-zinc-400'/></button>
              </div>

              <p className='text-sm text-zinc-400'>Para concluir a criação da viagem para 
                <span className='font-semibold text-zinc-100'>&nbsp;Curitiba&nbsp;</span>
                nas datas de 
                <span className='font-semibold text-zinc-100'>&nbsp;22/07/2014&nbsp;</span>
                preencha seus dados abaixo.
              </p>
                
            </div>

            <form onSubmit={addEmail} className='space-y-3'>
              <div className='py-2.5 px-5 bg-zinc-950 border border-zinc-800 rounded-md flex items-center'>
                <User className='size-5 text-zinc-400 ' />
                <input type="text" name="name" placeholder="Seu nome completo" className='px-3 bg-transparent outline-none' />
              </div>

              <div className='py-2.5 px-5 bg-zinc-950 border border-zinc-800 rounded-md flex items-center'>
                <User className='size-5 text-zinc-400 ' />
                <input type="email" name="email" placeholder="Seu email pessoal" className='px-3 bg-transparent outline-none' />
              </div>
              
              <button type='submit' className='w-full justify-center bg-lime-300 text-lime-950 rounded-lg px-5 py-2 h-10 font-medium flex items-center gap-1 hover:bg-lime-400'>
                Confirmar criação da viagem
                <Plus className='size-5 text-lime-950' />
              </button>
            </form>
          </div>
        </div>
      )}





      
    </div>

  )
}

