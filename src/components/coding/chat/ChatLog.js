import React from 'react'
import UserChat from './userchat/UserChat'
import Loading from './Loading'
import SystemChat from './systemchat/SystemChat'

export default function ChatLog({lang, chain, responseLoading}) {
  return (
    <div className='flex flex-col w-full pl-5 pr-5'>
        {
            chain.map((message) => {
               if (message['role'] === 'user') {
                  return <UserChat message={message["content"]}/>
               } else if (message['role'] === 'assistant') {
                return <SystemChat lang={lang} message={message["content"]}/>
               }
            })
        }
        {
          responseLoading ? (
            <Loading message={"Responses can take up to a minute. "}/>
          ) : (
            <></>
          )
        }
    </div>
  )
}
