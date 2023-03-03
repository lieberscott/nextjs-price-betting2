import { useRouter } from "next/router"

export default function MarketsPage() {
  const router = useRouter();

  const { params = [] } = router.query
  return <h1>Markets home page</h1>
}