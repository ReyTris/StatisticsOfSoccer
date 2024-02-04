import { RouterProvider, createBrowserRouter } from "react-router-dom"
import { Layout } from "./components/layout/Layout"
import { TestPage } from "./pages/TestPage"

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout/>,
    children: [
      {
        path: '/test',
        element: <TestPage/>
      }
    ]
  }
])

function App() {
  return (
    <RouterProvider router={router}/>
  )
}

export default App
