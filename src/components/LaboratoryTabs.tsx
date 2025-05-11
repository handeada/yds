import React, { useState } from "react";
import { useSelector } from "react-redux";
import { getSelectedCity } from "@/store/map";
import { LAB_TAB_TITLES } from "@/models";
import LaboratoryTable from "./LaboratoryTable";
import ExperimentMaterialStandardsTable from "./ExperimentMaterialStandardsTable";

const LaboratoryTabs: React.FC = () => {
  const { selectedCityPlate } = useSelector(getSelectedCity);
  const [activeLabTab, setActiveLabTab] = useState(
    LAB_TAB_TITLES.activeLaboratory.value
  );

  return (
    <div className="w-full">
      <div className="mb-3">
        <h3 className="text-base text-gray-700 font-medium mb-2">
          Laboratuvar Verileri
        </h3>
        <div className="bg-gray-50 rounded-md p-2">
          <nav className="flex" aria-label="Laboratory Tabs">
            {Object.values(LAB_TAB_TITLES).map(({ value, title }) => (
              <button
                key={value}
                onClick={() => setActiveLabTab(value)}
                className={`${
                  activeLabTab === value
                    ? "bg-white text-blue-600 font-medium shadow-sm"
                    : "text-gray-600 hover:text-gray-800 hover:bg-gray-100"
                } rounded-md py-1.5 px-3 text-xs transition-colors duration-150 flex-1 mx-1`}
              >
                {title}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {activeLabTab === LAB_TAB_TITLES.activeLaboratory.value && (
        <LaboratoryTable cityId={selectedCityPlate} />
      )}

      {activeLabTab === LAB_TAB_TITLES.scopeList.value && (
        <ExperimentMaterialStandardsTable />
      )}
    </div>
  );
};

export default LaboratoryTabs;
