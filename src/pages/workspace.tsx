import { useParams } from "react-router-dom";
import useStore from "../store";
import { useEffect } from "react";
import InfoCard from "./infoCard";
import Patients from "./patients";

function Workspace() {
  const { workspaceId } = useParams();
  const { getAllPatients, getSingleWorkspace, currentWorkspace } = useStore();

  useEffect(() => {
    const fetchData = async () => {
      await getAllPatients();
      await getSingleWorkspace({ id: parseInt(workspaceId!) });
    };
    fetchData();
  }, [getAllPatients, getSingleWorkspace]);

  return (
    <div className="   flex flex-col w-full min-h-[93vh] bg-blue-50">
      <div className="w-[97%] mx-auto mt-6">
        <InfoCard currentElement={currentWorkspace} />
      </div>

      <div className="w-[97%] mx-auto mt-6">
        <Patients />
      </div>
    </div>
  );
}
export default Workspace;
