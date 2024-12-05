import { useEffect, useState } from "react";
import ContextMenu, { IMenuItem } from "./contextMenu";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { IWorkspace } from "../mockResponse/workspaceResponse";
import { IPatient } from "../mockResponse/patientResponse";
import { AccessControl } from "../AccessControl";
import { TEntityType, TPermissionType } from "../state/authSlice";

interface InfoCardProps {
  currentElement: IWorkspace | IPatient | null;
  contextMenuItems: IMenuItem[];
  entity: TEntityType;
  permissions: TPermissionType[];
}

function InfoCard({
  currentElement,
  contextMenuItems,
  entity,
  permissions,
}: InfoCardProps) {
  const [data, setData] = useState<IWorkspace | IPatient | null>(null);
  const [anchorElement, setAnchorElement] = useState<null | HTMLElement>(null);
  const menuVisible = Boolean(anchorElement);

  useEffect(() => {
    setData(currentElement);
  }, [currentElement]);

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) =>
    setAnchorElement(event.currentTarget);

  const handleMenuClose = () => setAnchorElement(null);
  if (!data) return;
  return (
    <>
      <ContextMenu
        anchorElement={anchorElement}
        open={menuVisible}
        onClose={handleMenuClose}
        items={contextMenuItems}
      />

      <div className=" flex flex-col min-h-[150px] rounded-2xl shadow-lg w-full bg-white py-6 px-7 gap-5">
        <div className="flex justify-between">
          <div className="font-medium text-2xl">{data?.name}</div>
          <AccessControl
            entity={entity}
            jsx={
              <div onClick={handleMenuClick}>
                <MoreVertIcon></MoreVertIcon>
              </div>
            }
            permissions={permissions}
          />
          {/* {data && (
            <div onClick={handleMenuClick}>
              <MoreVertIcon></MoreVertIcon>
            </div>
          )} */}
        </div>
        <div className="flex">
          {Object.keys(data).map((key) => {
            const propertyKey = key as keyof typeof data;
            return (
              <ul className="w-full flex justify-between">
                <li key={key} className="flex flex-col justify-between">
                  <span className="font-meduium text-gray-400 capitalize">
                    {key}
                  </span>
                  <span>
                    {data[propertyKey] !== null
                      ? typeof data[propertyKey] === "object"
                        ? Object.keys(data[propertyKey]).length
                        : data[propertyKey]
                      : "no data found"}
                  </span>
                </li>
              </ul>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default InfoCard;
