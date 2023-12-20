import { useTranslation } from "next-i18next";
import { Employees } from "@/lib/zod/paragraph";
import { Paragraph } from "../paragraph";

export function ParagraphEmployees({ paragraph }: { paragraph: Employees }) {
  const { t } = useTranslation();
  
  
 
  return (
    <div>
        <div>
            <h1 className=" font-semibold text-lg py-4">{t("Do you want to hear more about Wunder? Contact us")}</h1>
        </div>
      <div className="flex justify-start items-center">
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {paragraph.field_employees_content_elements.map((paragraph)=><Paragraph key={paragraph.id} paragraph={paragraph}></Paragraph>)}
        </ul>
      </div>
    </div>
  );
}
