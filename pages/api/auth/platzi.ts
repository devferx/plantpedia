import type { NextApiHandler } from 'next'

const credentialsAuth: NextApiHandler<User> = (request, response) => {
  // GET any not OK
  if (request.method !== 'POST') {
    response.status(405).end()
    return
  }

  // POST - ok
  // validar credentials
  if (request.body.password === process.env.AUTH_PLATZI_SECRET) {
    const platziUser: User = {
      name: 'Platzi student',
      email: 'student@platzi.com',
      image: '/platzi.png',
    }

    return response.status(200).json(platziUser)
  }

  response.status(401).end()
}

export default credentialsAuth
