import '@styles/globals.css'
import Nav from '@components/Nav'
import Provider from '@components/Provider'

export const metadata = {
    title:"Share Prompts",
    description:"Discover & Share AI Prompts"
}

function RootLayout({children}) {
  return (
    <html lang='en'>
        <body>
            <Provider>
                <div className="main">
                    <div className="gradient" />
                </div>
                <div className="app">
                    <Nav />
                    {children}
                </div>
            </Provider>
        </body>
    </html>
  )
}

export default RootLayout