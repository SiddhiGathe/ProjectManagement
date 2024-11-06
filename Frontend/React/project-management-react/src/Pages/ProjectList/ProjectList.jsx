import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MagnifyingGlassIcon, MixerHorizontalIcon } from '@radix-ui/react-icons';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useEffect, useState } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import ProjectCard from '@/Pages/Project/ProjectCard.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProjects, searchProjects } from '@/Redux/Project/Action';

export const tags = [
    "All", "React", "Nextjs", "Spring boot", "Mysql", "Angular", "Python", "Flask", "Django","Javascript"
];

const ProjectList = () => {
    const [keyword, setKeyword] = useState("");
    const { project } = useSelector(store => store);
    const dispatch = useDispatch();

    const handleFilterCategory = (value) => {
        if (value == "All") {
            dispatch(fetchProjects({})); // Fetch all projects
        } else {
            dispatch(fetchProjects({ category: value })); // Fetch projects by category
        }
    };

    const handleFilterTags = (value) => {
      if (value == "All") {
        dispatch(fetchProjects({}));
      }else{
        dispatch(fetchProjects({tag:value}));
      }
    };

    const handleSearchChange = (e) => {
        setKeyword(e.target.value);
        dispatch(searchProjects(e.target.value));
    };
    


    console.log("Project store", project.projects);

    return (
        <div className='relative px-5 lg:px-0 lg:flex gap-5 justify-center py-5'>
            <section className='filterSection'></section>
            <Card className='p-5 sticky top-10'>
                <div className='flex justify-between lg:w-[20rem]'>
                    <p className='text-x1 -tracking-wider'>Filters</p>
                    <Button variant="ghost" size="icon">
                        <MixerHorizontalIcon />
                    </Button>
                </div>
                <CardContent className="mt-5">
                    <ScrollArea className="space-y-7 h-[70vh]">
                        <div>
                            <h1 className="pb-3 text-gray-400 border-b">Category</h1>
                            <div className="pt-5">
                                <RadioGroup className="space-y-3 pt-5" defaultValue="All" onValueChange={(value) => handleFilterCategory(value)}>
                                    <div className="flex items-center gap-2">
                                        <RadioGroupItem value="All" id="r1" />
                                        <Label htmlFor="r1">All</Label>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <RadioGroupItem value="fullstack" id="r2" />
                                        <Label htmlFor="r2">Fullstack</Label>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <RadioGroupItem value="frontend" id="r3" />
                                        <Label htmlFor="r3">Frontend</Label>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <RadioGroupItem value="backend" id="r4" />
                                        <Label htmlFor="r4">Backend</Label>
                                    </div>
                                </RadioGroup>
                            </div>
                        </div>

                        <div className="pt-9">
                            <h1 className="pb-3 text-gray-400 border-b">Tag</h1>
                            <div className="pt-5">
                                <RadioGroup className="space-y-3 pt-5" defaultValue="All" onValueChange={(value) => handleFilterTags(value)}>
                                    {tags.map((item) => (
                                        <div key={item} className="flex items-center gap-2">
                                            <RadioGroupItem value={item} id={`r1-${item}`} />
                                            <Label htmlFor={`r1-${item}`}>{item}</Label>
                                        </div>
                                    ))}
                                </RadioGroup>
                            </div>
                        </div>
                    </ScrollArea>
                </CardContent>
            </Card>

            <section className='projectListSection w-full lg:w-[48rem]'>
                <div className="flex gap-2 items-center pb-5 justify-between">
                    <div className="relative p-0 w-full">
                        <Input onChange={handleSearchChange} placeholder="Search project..." className="40% px-9" />
                        <MagnifyingGlassIcon className="absolute top-3 left-4" />
                    </div>
                </div>
                <div> 
                <div className="space-y-5 min-h-[74vh]">
    {keyword.length > 0 
        ? project.searchProjects && project.searchProjects.length > 0 
            ? project.searchProjects.map((item) => <ProjectCard item={item} key={item.id} />) 
            : <p>No search results found.</p>
        : project.projects && project.projects.length > 0 
            ? project.projects.map((item) => <ProjectCard item={item} key={item.id} />) 
            : <p>No projects available.</p>
    }
</div>

                </div>
            </section>
        </div>
    );
}

export default ProjectList;