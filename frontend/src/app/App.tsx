import { Suspense } from 'react'
import './App.scss'
import routes from './routes'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { store } from '@store/index'
import { Provider } from 'react-redux'
import ThemeToggle from '@/components/ThemeToggle'
import Navigation from '@/components/Navigation'

function App() {

  return (
    <>
      <BrowserRouter>
		<Suspense fallback={<div>Loading...</div>}>
		<Provider store={store}>
		<Navigation />
		<ThemeToggle />
		<Routes >
			{routes.map((route) => (
				<Route key={route.path} path={route.path} element={<route.element />} />
			))}
			<Route path="*" element={<Navigate to="/list" />} />
		</Routes>
		</Provider>
		</Suspense>
	</BrowserRouter>
    </>
  )
}

export default App
