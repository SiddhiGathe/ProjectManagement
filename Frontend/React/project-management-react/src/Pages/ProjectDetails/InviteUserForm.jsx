
import { Button } from "@/components/ui/button"
import { DialogClose } from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormMessage,FormItem } from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { useDispatch } from "react-redux"
import { inviteToProjects } from "@/Redux/Project/Action"
import { useParams } from "react-router-dom"
import {z} from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
const formSchema = z.object({
  email: z.string().email('Invalid email address'),
 
});
const InviteUserForm = ({projectId}) => {
  const dispatch=useDispatch();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      
    },
  });
  const onSubmit = (data) => {
    data.projectId=projectId
    console.log("Project ID before dispatch:", projectId)
    dispatch(inviteToProjects(data))
    
    console.log("sent invitation", data);

  };
  return (
    <div>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          {...field}
                          className="border w-full border-gray-700 py-5 px-5"
                          placeholder="enter user email"
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button type="submit" className="w-full bg-slate-400 py-5">
                  SENT INVITATION
                </Button>
              </form>
            </Form>

         
          </div>
  );
};

export default InviteUserForm;
