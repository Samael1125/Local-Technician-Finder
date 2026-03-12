"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">

      <Card className="w-[400px]">

        <CardHeader>
          <CardTitle>Sign In</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">

          <div>
            <Label>Email</Label>
            <Input placeholder="Enter your email" />
          </div>

          <div>
            <Label>Password</Label>
            <Input type="password" placeholder="Enter password" />
          </div>

          <Button className="w-full">
            Sign In
          </Button>

        </CardContent>

      </Card>

    </div>
  )
}