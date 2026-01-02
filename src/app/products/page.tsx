import FeaturedProducts from '@/src/components/FeaturedProducts'
import Loading from '@/src/loading/Loading'
import { Suspense } from 'react'

export default function page() {
  return (
    <div>
      <Suspense fallback={<Loading></Loading>}>
        <FeaturedProducts></FeaturedProducts>
      </Suspense>
    </div>
  )
}
