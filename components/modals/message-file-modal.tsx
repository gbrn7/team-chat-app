'use client'
import * as z from "zod";
import axios from "axios";
import qs from "query-string";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form"

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from "../ui/dialog"

import {
  Form,
  FormControl,
  FormField,
  FormItem,

} from "../ui/form";
import { Button } from "@/components/ui/button";
import { FileUpload } from "@/components/ui/file-upload";
import { useRouter } from "next/navigation";
import { useModal } from "@/hooks/use-modal-store";

const formShcema = z.object({
  fileUrl: z.string().min(1, {
    message: "Attachment is required"
  })
});

export const MessageFileModal = () => {
  const { isOpen, onClose, type, data } = useModal();

  const isMOodalOpen = isOpen && type == "messageFile";

  const { apiUrl, query } = data;

  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(formShcema),
    defaultValues: {
      fileUrl: "",
    }
  })

  const handleClose = () => {
    form.reset();
    onClose();
  }

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formShcema>) => {
    try {
      const url = qs.stringifyUrl({
        url: apiUrl || "",
        query
      });

      await axios.post(url, {
        ...values,
        content: values.fileUrl,
      });


      form.reset();
      router.refresh();

      handleClose();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Dialog onOpenChange={handleClose} open={isMOodalOpen}>
      <DialogContent className="bg-white text-black p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            Add an attachment
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-500">
            Send a file as a message          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="space-y-8 px-6">
              <div className="flex items-center text-center justify-center ">
                <FormField
                  control={form.control}
                  name="fileUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <FileUpload
                          endpoint="messageFile"
                          onChange={field.onChange}
                          value={field.value} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <DialogFooter className="bg-gray-100 px-6 py-4">
              <Button disabled={isLoading} variant={"primary"}>
                Send
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}