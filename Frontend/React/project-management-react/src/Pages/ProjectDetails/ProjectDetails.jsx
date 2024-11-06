import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTrigger } from "@/components/ui/dialog"

import { PlusIcon } from "lucide-react"
import InviteUserForm from "./InviteUserForm"
import { ScrollArea } from "@/components/ui/scroll-area"
import IssueList from "./IssueList"
import ChatBox from "./ChatBox"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { fetchProjectById } from "@/Redux/Project/Action"
import { useEffect } from "react"
import {store} from "@/Redux/store"

const ProjectDetails = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { project,auth } = useSelector((store) => store);
    useEffect(() => {
      dispatch(fetchProjectById(id));
    }, [id]);
  
    const handleProjectInvitation = () => {
      dispatch(inviteToProject({ email: "", projectId: id }));
    };
  return (
    <>
    <div className="mt-5 lg:px-10">
        <div className="lg:flex gap-5 justify-between pb-4">
            <ScrollArea className="h-screen lg:w-[69%] pr-2">
                <div className="text-gray-400 pb-10 w-full">
                    <h1 className="text-lg font-semibold pb-5">{project.ProjectDetails?.name}</h1>
                    <div className="space-y-5 pb-10 text-sm">
                    <p className="w-full md:max-w-lg lg:max-w-xl text-sm">{project.ProjectDetails?.description}</p>
                <div className="flex">
                    <p className="w-36">Project Lead:</p>
                    <p>{project.ProjectDetails?.owner.fullName}</p>
                </div>
                <div className="flex">
                    <p className="w-36">Memebers:</p>
                    <div className="flex items-center gap-2">
                        {project.ProjectDetails?.team.map((item)=><Avatar className="cursor-pointer" key={item}>
                            <AvatarFallback>{item.fullName[0]}</AvatarFallback>
                        </Avatar>)}
                    </div>
                    <Dialog>
                        <DialogTrigger>
                            <DialogClose>
                                <Button size="sm" variant="outline" onClick={handleProjectInvitation} className="ml-2">
                                    <span>invite</span>
                                    <PlusIcon className="w-3 h-3"/>
                                </Button>
                            </DialogClose>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>Invite user</DialogHeader>
                            <InviteUserForm projectId={id}/>
                        </DialogContent>
                    </Dialog>
                </div>
                <div className="flex">
                    <p className="w-36">Category:</p>
                    <p>{project.ProjectDetails?.category}</p>
                </div>
                <div className="flex">
                    <p className="w-36">Project Lead:</p>
                    <Badge>{project.ProjectDetails?.owner.fullName}</Badge>
                </div>
                </div>
                <section>
                    <p className="py-5 border-b text-lg -tracking-wider">Tasks</p>
                    <div className="lg:flex md:flex gap-3 justify-between py-5">
                        <IssueList status="pending" title="Todo List"/>
                        <IssueList status="in_progress" title="In progress"/>
                        <IssueList status="done" title="Done"/>
                    </div>
                </section>
                </div>
                
            </ScrollArea>
            <div className="lg:w-[30%] rounded-md sticky right-5 top-0">
                <ChatBox></ChatBox>
            </div>
        </div>
    </div>
    </>
  )
}

export default ProjectDetails