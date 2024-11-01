import JobCard from "@/components/JobCard";
import { FC, useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { FiSearch } from "react-icons/fi";
import FilterAndSort from "@/components/FilterAndSort";
import { JobFilterProvider, useJobFilter } from "@/context/JobFilterContext";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

interface JobBoardPageProps {}
const JobBoardPage: FC<JobBoardPageProps> = () => {
  const [jobs, setJobs] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const { selectedJobLocation, selectedDomain } = useJobFilter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchJobs = async () => {
      try {
        const response = await fetch(
          "https://stacklearning-be.onrender.com/api/all-jobs",
          {
            headers: {
              authkey: "8e92ab9c92b24b5fb5b6afaf92b7ef12",
            },
          }
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setLoading(false);
        setJobs(data);
      } catch (err) {
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const filteredJobs = jobs.filter(
    (job) =>
      [job.jobTitle, job.companyName].some((field) =>
        field.toLowerCase().includes(searchQuery.toLowerCase())
      ) &&
      (selectedJobLocation === "Any" || job.location === selectedJobLocation) &&
      (selectedDomain === "Any" || job.domain === selectedDomain)
  );

  console.log(filteredJobs);
  if (loading)
    return <div className="flex justify-center items-center w-full h-[40vh]">
      <AiOutlineLoading3Quarters size={28} className="animate-spin text-primaryNew" />
    </div>;
  return (
    <JobFilterProvider>
      <div className="relative">
        <div className="sticky top-0 pt-4 pb-2 bg-[#fbfbfb]">
          <div className="relative w-[95%] sm:w-[80%] m-auto mb-4 flex items-center">
            <Input
              type="text"
              placeholder="Search for Company, Roles"
              className="sm:max-w-md w-full py-5 pl-10 rounded-xl"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div>
              {/* <button className="px-3 py-[9px] rounded text-sm font-semibold bg-primaryNew text-white flex items-center gap-1">
                Search
              </button> */}
            </div>
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          </div>
        </div>
        <div className="md:w-[80%] m-auto flex gap-4 flex-col md:flex-row w-[95%]">
          <div className="flex flex-1 flex-col gap-y-4">
            {filteredJobs.map((job, index) => (
              <JobCard
                key={index}
                jobTitle={job.jobTitle}
                companyName={job.companyName}
                jobDescriptionText={job.jobDescriptionText}
                image={job.image}
                tagsArray={job.tagsArray}
                date={job.date}
                location={job.location}
                jobType={job.jobType}
                experienceRequired={job.experienceRequired}
                jobDescriptionHtml={job.jobDescriptionHtml}
                link={job.link}
              />
            ))}
          </div>
          <div className="hidden md:flex basis-1/3 border rounded-lg p-4 h-fit sticky top-44 bg-white">
            <FilterAndSort />
          </div>
        </div>
      </div>
    </JobFilterProvider>
  );
};

export default JobBoardPage;
