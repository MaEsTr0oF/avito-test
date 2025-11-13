import { useEffect } from 'react'

export default function ListPage() {
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
      .then(json => console.log(json))
  }, [])

  return <div>ListPage</div>
}