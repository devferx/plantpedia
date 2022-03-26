import { Layout } from '@components/Layout'
import type { GetServerSideProps } from 'next'
import { useSession, getSession } from 'next-auth/react'

export const getServerSideProps: GetServerSideProps<{}> = async (context) => {
  const session = await getSession(context)

  if (session == null) {
    return {
      redirect: {
        destination: '/api/auth/signin',
        permanent: false,
      },
    }
  }

  return {
    props: { session },
  }
}

function PremiumPage({}) {
  const { data: session, status } = useSession()

  if (status === 'loading') {
    return null
  }

  if (session == null) {
    // denied
    return <Layout>Acceso Denegado</Layout>
  }

  // Logguead
  return <Layout>Contenido secretisimo</Layout>
}

export default PremiumPage
