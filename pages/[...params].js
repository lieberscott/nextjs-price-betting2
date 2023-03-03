import { useRouter } from "next/router"

function MarketsPage() {
  const router = useRouter();

  const { params = [] } = router.query
  return <h1>Markets home page</h1>
}

export default MarketsPage;