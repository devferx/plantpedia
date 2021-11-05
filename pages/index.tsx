import { GetStaticProps, InferGetStaticPropsType } from 'next'
import { Layout } from '@components/Layout'
import { PlantCollection } from '@components/PlantCollection'

import { getPlantList } from '@api'
import { Authors } from '@components/Authors'
import { Hero } from '@components/Hero'

type HomeProps = { plants: Plant[] }

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const plants = await getPlantList({ limit: 10 })

  return {
    props: {
      plants,
    },
    revalidate: 5 * 60, // refresh 5 min.
  }
}

export default function Home({
  plants,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Layout>
      <Hero className="mb-20" {...plants[0]} />
      <Authors className="mb-10" />
      <PlantCollection
        className="mb-24"
        plants={plants.slice(1, 3)}
        variant="vertical"
      />
      <PlantCollection
        plants={plants.length > 8 ? plants.slice(3, 9) : plants}
        variant="square"
      />
    </Layout>
  )
}
