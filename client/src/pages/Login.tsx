import { useState } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { api } from '@/lib/axios'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { useAuth } from '@/context/AuthContext'

const schema = z.object({
  username: z.string().min(3),
  password: z.string().min(6),
})

type FormData = z.infer<typeof schema>

export default function Login() {
  const navigate = useNavigate()
  const { refresh } = useAuth()
  const [loading, setLoading] = useState(false)
  const form = useForm<FormData>({ resolver: zodResolver(schema), defaultValues: { username: '', password: '' } })

  async function onSubmit(values: FormData) {
    try {
      setLoading(true)
      await api.post('/login', values)
      await refresh()
      toast.success('Logged in')
      navigate('/profile')
    } catch (e: any) {
      toast.error(e?.response?.data?.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto max-w-md py-10">
      <Card>
        <CardHeader>
          <CardTitle>Login</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField name="username" control={form.control} render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl><Input placeholder="yourname" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField name="password" control={form.control} render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl><Input type="password" placeholder="••••••••" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <Button type="submit" className="w-full" disabled={loading}>{loading? 'Logging in...' : 'Login'}</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
