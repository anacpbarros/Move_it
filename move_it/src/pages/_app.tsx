// tudo o que é fixo na página fica aqui (fazem parte de todas as telas)
//sidebars, cabeçalhos...
//para cada root, vai se criando novas paginas tipo index.js

import '../styles/global.css'

function MyApp({ Component, pageProps }) {

  return (    
    <Component {...pageProps} />
  ) 
}

export default MyApp
