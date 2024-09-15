import { useEffect } from "react"
import { useParams } from "react-router-dom"

export const useRouterParams = () => {
  const { id } = useParams()
  useEffect(() => {}, [id])
  return id
}