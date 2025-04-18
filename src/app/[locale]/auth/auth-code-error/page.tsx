// app/auth/auth-code-error/page.tsx
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

type SearchParams = {
  error?: string
}

export default async function AuthErrorPage({
  searchParams
}: {
  searchParams: Promise<SearchParams>
}) {
  const params = await searchParams;

  return (
    <div className="flex min-h-screen items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <h1 className="text-2xl font-bold">Authentication Error</h1>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            {params.error === 'no_code'
              ? 'No authentication code was provided.'
              : params.error || 'An error occurred during authentication.'}
          </p>
        </CardContent>
        <CardFooter>
          <Link href="/login">
            <Button>Return to Login</Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}