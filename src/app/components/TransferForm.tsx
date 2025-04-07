import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import API from '@/app/apis'
import { useWalletContext } from "@/app/contexts/useWalletContext";
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Send } from "lucide-react";
import { useFormStatus } from 'react-dom';

const TransferForm = () => {
  const { wallet } = useWalletContext();
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const { pending, data } = useFormStatus();

  const formSchema = z.object({
    fromAddress: z.string().min(2).max(50),
    toAddress: z.string().min(2).max(50),
    amount: z.string(),
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fromAddress: wallet,
      toAddress: "",
      amount: "",
    },
  })

  const onSubmit = useCallback(async(values: z.infer<typeof formSchema>) => {
    await API.sendETH({
      fromAddress: values.fromAddress,
      toAddress: values.toAddress,
      amount: values.amount,
    }).then(() => {
      form.reset({
        fromAddress: wallet,
        toAddress: "",
        amount: "",
      })
      setError(null)
      setOpen(false)
    }).catch((error) => {
      setError(error.message)
    })
  }, [wallet])

  useEffect(() => {
    form.reset({
      fromAddress: wallet,
      toAddress: "",
      amount: "",
    })
  }, [wallet])

  if (!wallet) {
    return
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Send className="w-5 h-5 mr-1"/>
          Send
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogTitle>Transfer</DialogTitle>
        {
          error &&
            <Alert className="bg-red-200">
              <AlertDescription className="text-black">
                {error}
              </AlertDescription>
            </Alert>
        }
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="fromAddress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>From</FormLabel>
                  <FormControl>
                    <Input {...field} disabled />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="toAddress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>To</FormLabel>
                  <FormControl>
                    <Input placeholder="0x.." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount</FormLabel>
                  <FormControl>
                    <Input placeholder="0" type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={pending}>Submit</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default TransferForm;
