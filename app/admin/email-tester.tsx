"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { sendTestEmail } from "@/app/actions/send-test-email"
import { useToast } from "@/hooks/use-toast"
import { Mail, Loader2, AlertTriangle } from "lucide-react"

export default function EmailTester() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const result = await sendTestEmail(email)

      if (result.success) {
        toast({
          title: "Success",
          description: result.message,
        })
      } else {
        toast({
          title: "Error",
          description: result.message,
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error sending test email:", error)
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Email Tester</CardTitle>
        <CardDescription>Send a test order confirmation email to verify your email configuration</CardDescription>
      </CardHeader>
      <CardContent>
        {!process.env.RESEND_API_KEY && (
          <div className="mb-4 p-3 bg-yellow-50 text-yellow-800 rounded-md flex items-start gap-2">
            <AlertTriangle className="h-5 w-5 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-medium">Resend API Key Not Configured</p>
              <p className="text-sm">
                Email sending will be simulated. Add a RESEND_API_KEY to your environment variables to enable actual
                email sending.
              </p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter recipient email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Sending...
              </>
            ) : (
              <>
                <Mail className="mr-2 h-4 w-4" />
                {process.env.RESEND_API_KEY ? "Send Test Email" : "Simulate Test Email"}
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

