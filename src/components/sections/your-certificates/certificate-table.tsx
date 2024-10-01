"use client";

import Link from "next/link";

import { Status } from "@prisma/client";

import {
  IBirthCertificates,
  IDeathCertificates,
  IMarriageCertificates,
  IResidentialCertificates,
} from "@/types";

import { cn } from "@/lib/utils";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Button from "@/components/ui/Button";

interface ICertificateTableProps {
  allCertificates: {
    birth: IBirthCertificates[];
    death: IDeathCertificates[];
    marriage: IMarriageCertificates[];
    residential: IResidentialCertificates[];
  };
}

const CertificateTable = ({ allCertificates }: ICertificateTableProps) => {
  let serialNumber = 1;

  const handleDelete = (
    type: "birth" | "death" | "marriage" | "residential"
  ) => {
    console.log("Delete selected certificates of type", type);
  };

  const renderTableBody = (
    certificates: (
      | IBirthCertificates
      | IDeathCertificates
      | IMarriageCertificates
      | IResidentialCertificates
    )[],
    type: "birth" | "death" | "marriage" | "residential"
  ) => {
    return certificates.map((certificate, index) => {
      // Type guard to check if it's a marriage certificate
      if (type === "marriage") {
        const marriageCertificate = certificate as IMarriageCertificates;
        return (
          <TableRow key={marriageCertificate.id} className="cursor-pointer">
            <TableCell className="font-medium">{serialNumber++}</TableCell>
            <TableCell>{marriageCertificate.applicationNumber}</TableCell>
            <TableCell>
              {`${marriageCertificate.husbandFirstName} ${
                marriageCertificate.husbandMiddleName || ""
              } ${marriageCertificate.husbandLastName} & ${
                marriageCertificate.WifeFirstName
              } ${marriageCertificate.wifeMiddleName || ""} ${
                marriageCertificate.wifeLastName
              }`}
            </TableCell>
            <TableCell className="capitalize">{type}</TableCell>
            <TableCell
              className={cn(
                "font-semibold",
                marriageCertificate.status === Status.APPROVED &&
                  "text-emerald-500",
                marriageCertificate.status === Status.REJECTED &&
                  "text-red-500",
                marriageCertificate.status === Status.PENDING &&
                  "text-amber-500"
              )}
            >
              {marriageCertificate.status}
            </TableCell>
            <TableCell className="flex gap-4">
              <Link
                href={`/your-certificates/${type}?id=${marriageCertificate.id}`}
              >
                <Button className="w-20">View</Button>
              </Link>
            </TableCell>
          </TableRow>
        );
      }

      // For residential certificate
      if (type === "residential") {
        const residentialCertificate = certificate as IResidentialCertificates;
        return (
          <TableRow key={residentialCertificate.id} className="cursor-pointer">
            <TableCell className="font-medium">{serialNumber++}</TableCell>
            <TableCell>{residentialCertificate.applicationNumber}</TableCell>
            <TableCell>
              {`${residentialCertificate.requester.requesterFirstName} ${
                residentialCertificate.requester.requesterMiddleName || ""
              } ${residentialCertificate.requester.requesterLastName} `}
            </TableCell>
            <TableCell className="capitalize">{type}</TableCell>
            <TableCell
              className={cn(
                "font-semibold",
                residentialCertificate.status === Status.APPROVED &&
                  "text-emerald-500",
                residentialCertificate.status === Status.REJECTED &&
                  "text-red-500",
                residentialCertificate.status === Status.PENDING &&
                  "text-amber-500"
              )}
            >
              {residentialCertificate.status}
            </TableCell>
            <TableCell className="flex gap-4">
              <Link
                href={`/your-certificates/${type}?id=${residentialCertificate.id}`}
              >
                <Button className="w-20">View</Button>
              </Link>
            </TableCell>
          </TableRow>
        );
      }

      // For birth and death certificates
      const { id, applicationNumber, firstName, middleName, lastName, status } =
        certificate as IBirthCertificates | IDeathCertificates;
      return (
        <TableRow key={id} className="cursor-pointer">
          <TableCell className="font-medium">{serialNumber++}</TableCell>
          <TableCell>{applicationNumber}</TableCell>
          <TableCell>{`${firstName} ${
            middleName || ""
          } ${lastName}`}</TableCell>
          <TableCell className="capitalize">{type}</TableCell>
          <TableCell
            className={cn(
              "font-semibold",
              status === Status.APPROVED && "text-emerald-500",
              status === Status.REJECTED && "text-red-500",
              status === Status.PENDING && "text-amber-500"
            )}
          >
            {status}
          </TableCell>
          <TableCell className="flex gap-4">
            <Link href={`/your-certificates/${type}?id=${id}`}>
              <Button className="w-20">View</Button>
            </Link>
          </TableCell>
        </TableRow>
      );
    });
  };

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableCaption>A list of recent applied certificates.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">S.No.</TableHead>
            <TableHead>Application Number</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Certificate Type</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {renderTableBody(allCertificates.birth, "birth")}
          {renderTableBody(allCertificates.death, "death")}
          {renderTableBody(allCertificates.marriage, "marriage")}
          {renderTableBody(allCertificates.residential, "residential")}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={7}>
              Showing{" "}
              {(allCertificates.birth.length +
                allCertificates.death.length +
                allCertificates.marriage.length) |
                allCertificates.residential.length}{" "}
              of{" "}
              {allCertificates.birth.length +
                allCertificates.death.length +
                allCertificates.marriage.length +
                allCertificates.residential.length}{" "}
              rows
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
};

export default CertificateTable;
