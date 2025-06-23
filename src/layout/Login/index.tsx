import { useState } from 'react'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { useNavigate, Link } from 'react-router-dom'

import { Form } from '../../components/ui/form'
import { Button } from '../../components/ui/button'
import CustomInput from '../../components/CustomInput'
import { useAuthStore } from '../../store/useAuthStore'
import { loginFormSchema } from '../../lib/utils'

const LogIn = () => {
  const navigate = useNavigate()
  const { loginUser, loading } = useAuthStore()
  const [isLoading, setIsLoading] = useState(false)

  const schema = loginFormSchema()

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      phone: undefined,
      password: undefined,
    },
  })

  const onSubmit = async (data: z.infer<typeof schema>) => {
    setIsLoading(true)
    try {
      await loginUser({
        phone: data.phone,
        password: data.password,
      })

      // Navigate on success
      navigate('/')
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : 'Authentication failed'
      )
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="flex items-center justify-center min-h-screen bg-gradient-to-tr from-white via-gray-50 to-gray-100 px-6 py-12 select-none">
      <div
        className="w-full max-w-md bg-white rounded-3xl shadow-lg border border-gray-200 p-10
                   backdrop-filter backdrop-blur-sm"
      >
        <section className="flex flex-col items-center w-full">
          <header className="mb-8 text-center">
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight drop-shadow-sm">
              Welcome Back <span aria-label="wave" role="img">👋</span>
            </h1>
            <p className="mt-2 text-base text-gray-600 max-w-sm mx-auto leading-relaxed">
              Please enter your credentials to continue.
            </p>
          </header>

          <Form {...form}>
            <form
              className="space-y-7 w-full"
              onSubmit={form.handleSubmit(onSubmit)}
              noValidate
            >
              <CustomInput
                control={form.control}
                name="phone"
                label="Phone"
                type="number"
                placeholder="Enter your phone number"
                className="bg-gray-50 text-gray-900 placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500 rounded-xl border border-gray-300 shadow-sm transition"
              />

              <CustomInput
                control={form.control}
                name="password"
                label="Password"
                type="password"
                placeholder="Enter your password"
                className="bg-gray-50 text-gray-900 placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500 rounded-xl border border-gray-300 shadow-sm transition"
               
              />

              <Button
                type="submit"
                disabled={isLoading || loading}
                className="w-full rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600
                           text-white font-semibold py-3 text-lg shadow-lg hover:shadow-xl
                           hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700
                           transition duration-300 disabled:opacity-60"
              >
                {isLoading ? 'Logging in...' : 'Login'}
              </Button>
            </form>
          </Form>

          <footer className="mt-8 text-center text-sm text-gray-700">
            Don’t have an account?{' '}
            <Link
              to="/sign-up"
              className="font-semibold text-indigo-600 hover:text-indigo-800 hover:underline transition-colors duration-150"
            >
              Sign up
            </Link>
          </footer>
        </section>
      </div>
    </main>
  )
}

export default LogIn
