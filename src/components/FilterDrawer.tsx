import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "./ui/button";
import { RiFilter3Fill } from "react-icons/ri";
import { Checkbox } from "./ui/checkbox";
import { MdOutlineCancel } from "react-icons/md";
import { ToggleGroup, ToggleGroupItem } from "./ui/toggle-group";
import { useJobFilter } from "@/context/JobFilterContext";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

const FilterDrawer = () => {
  const {
    selectedJobLocation,
    setSelectedJobLocation,
    selectedPeriod,
    setSelectedPeriod,
    selectedDomain,
    setSelectedDomain,
    selectedJobType,
    setselectedJobType,
    selectedLocation,
    setSelectedLocation,
  } = useJobFilter();

  const handlePeriodChange = (period: string) => {
    setSelectedPeriod(period);
  };
  const locations = [
    { value: "any", label: "Any" },
    { value: "jaipur,rajasthan", label: "Jaipur, Rajasthan" },
    { value: "mumbai,maharashtra", label: "Mumbai, Maharashtra" },
    { value: "delhi,delhi", label: "Delhi, Delhi" },
    { value: "bengaluru,karnataka", label: "Bengaluru, Karnataka" },
    { value: "chennai,tamilnadu", label: "Chennai, Tamil Nadu" },
  ];

  return (
    <div>
      <Drawer>
        <DrawerTrigger className="p-2 bg-primaryNew text-white rounded flex items-center text-xs gap-2">
          Filter <RiFilter3Fill />
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Filter by</DrawerTitle>
            <DrawerDescription>
              <div className="mt-3">
                <h2 className="text-left text-sm font-semibold mb-3">
                  Date Posted
                </h2>
                <div className="flex flex-col gap-3 text-xs">
                  <div className="flex justify-between items-center">
                    <p>All</p>
                    <input
                      type="radio"
                      name="period"
                      value="any"
                      className="custom-radio"
                      checked={selectedPeriod === "any"}
                      onChange={() => handlePeriodChange("any")}
                    />
                  </div>
                  <div className="flex justify-between items-center">
                    <p>Today</p>
                    <input
                      type="radio"
                      name="period"
                      value="today"
                      className="custom-radio"
                      checked={selectedPeriod === "today"}
                      onChange={() => handlePeriodChange("today")}
                    />
                  </div>
                  <div className="flex justify-between items-center">
                    <p>Last week</p>
                    <input
                      type="radio"
                      name="period"
                      value="lastWeek"
                      className="custom-radio"
                      checked={selectedPeriod === "lastWeek"}
                      onChange={() => handlePeriodChange("lastWeek")}
                    />
                  </div>
                  <div className="flex justify-between items-center">
                    <p>Last month</p>
                    <input
                      type="radio"
                      name="period"
                      value="lastMonth"
                      className="custom-radio"
                      checked={selectedPeriod === "lastMonth"}
                      onChange={() => handlePeriodChange("lastMonth")}
                    />
                  </div>
                </div>
              </div>
              <div className="mt-3">
                <h2 className="text-left text-sm font-semibold mb-3">
                  Location
                </h2>
                <Select
                  value={selectedLocation}
                  onValueChange={(value) => setSelectedLocation(value)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Location</SelectLabel>
                      {locations.map((location) => (
                        <SelectItem key={location.value} value={location.label}>
                          {location.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="mt-3">
                <h2 className="text-left text-sm font-semibold mb-3">Domain</h2>
                <ToggleGroup
                  type="single"
                  value={selectedDomain}
                  onValueChange={setSelectedDomain}
                  className="flex justify-start"
                >
                  <ToggleGroupItem
                    value="Any"
                    className="px-5 data-[state=on]:bg-green-50 data-[state=on]:border data-[state=on]:border-green-200 data-[state=on]:text-primaryNew text-xs rounded-full"
                  >
                    All
                  </ToggleGroupItem>
                  <ToggleGroupItem
                    value="Data Science"
                    className="px-5 data-[state=on]:bg-green-50 data-[state=on]:border data-[state=on]:border-green-200 data-[state=on]:text-primaryNew text-xs rounded-full"
                  >
                    Data Science
                  </ToggleGroupItem>
                  <ToggleGroupItem
                    value="Android"
                    className="px-5 data-[state=on]:bg-green-50 data-[state=on]:border data-[state=on]:border-green-200 data-[state=on]:text-primaryNew text-xs rounded-full"
                  >
                    Android
                  </ToggleGroupItem>
                  <ToggleGroupItem
                    value="Web"
                    className="px-5 data-[state=on]:bg-green-50 data-[state=on]:border data-[state=on]:border-green-200 data-[state=on]:text-primaryNew text-xs rounded-full"
                  >
                    Web
                  </ToggleGroupItem>
                </ToggleGroup>
              </div>
              <div className="mt-3">
                <h2 className="text-left text-sm font-semibold mb-3">
                  Job Location
                </h2>
                <ToggleGroup
                  type="single"
                  className="flex justify-start"
                  value={selectedJobLocation}
                  onValueChange={(value) => {
                    if (value) setSelectedJobLocation(value);
                  }}
                >
                  <ToggleGroupItem
                    value="Any"
                    className="px-5 data-[state=on]:bg-green-50 data-[state=on]:border data-[state=on]:border-green-200 data-[state=on]:text-primaryNew text-xs rounded-full"
                  >
                    All
                  </ToggleGroupItem>
                  <ToggleGroupItem
                    value="Onsite"
                    className="px-5 data-[state=on]:bg-green-50 data-[state=on]:border data-[state=on]:border-green-200 data-[state=on]:text-primaryNew text-xs rounded-full"
                  >
                    Onsite
                  </ToggleGroupItem>
                  <ToggleGroupItem
                    value="Remote"
                    className="px-5 data-[state=on]:bg-green-50 data-[state=on]:border data-[state=on]:border-green-200 data-[state=on]:text-primaryNew text-xs rounded-full"
                  >
                    Remote
                  </ToggleGroupItem>
                  <ToggleGroupItem
                    value="Hybrid"
                    className="px-5 data-[state=on]:bg-green-50 data-[state=on]:border data-[state=on]:border-green-200 data-[state=on]:text-primaryNew text-xs rounded-full"
                  >
                    Hybrid
                  </ToggleGroupItem>
                </ToggleGroup>
              </div>
              <div className="mt-3">
                <h2 className="text-left text-sm font-semibold mb-3">
                  Job Type
                </h2>
                <ToggleGroup
                  type="single"
                  className="flex justify-start"
                  value={selectedJobType}
                  onValueChange={(value) => {
                    if (value) setselectedJobType(value);
                    console.log("inside --", value);
                  }}
                >
                  <ToggleGroupItem
                    value="Any"
                    className="px-5 data-[state=on]:bg-green-50 data-[state=on]:border data-[state=on]:border-green-200 data-[state=on]:text-primaryNew text-xs rounded-full"
                  >
                    All
                  </ToggleGroupItem>
                  <ToggleGroupItem
                    value="Full Time"
                    className="px-5 data-[state=on]:bg-green-50 data-[state=on]:border data-[state=on]:border-green-200 data-[state=on]:text-primaryNew text-xs rounded-full"
                  >
                    Full Time
                  </ToggleGroupItem>
                  <ToggleGroupItem
                    value="Part Time"
                    className="px-5 data-[state=on]:bg-green-50 data-[state=on]:border data-[state=on]:border-green-200 data-[state=on]:text-primaryNew text-xs rounded-full"
                  >
                    Part Time
                  </ToggleGroupItem>
                  <ToggleGroupItem
                    value="Contract"
                    className="px-5 data-[state=on]:bg-green-50 data-[state=on]:border data-[state=on]:border-green-200 data-[state=on]:text-primaryNew text-xs rounded-full"
                  >
                    Contract
                  </ToggleGroupItem>
                </ToggleGroup>
              </div>
            </DrawerDescription>
          </DrawerHeader>
          <DrawerFooter>
            <DrawerClose>
              <Button className="bg-primaryNew hover:bg-[#317562] w-full">
                Apply Filters
              </Button>
            </DrawerClose>
            <DrawerClose className="absolute top-3 right-3">
              <MdOutlineCancel />
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default FilterDrawer;
