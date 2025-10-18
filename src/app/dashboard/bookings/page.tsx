
"use client";

import { useState } from "react";
import { mockBookings, mockHalls } from "@/lib/data";
import type { Booking, Hall } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { CheckCircle, Clock, XCircle, Hourglass, Calendar, Building2, Check, X, Download } from "lucide-react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const statusConfig = {
  Approved: {
    icon: <CheckCircle className="size-4 text-green-500" />,
    badgeClass: "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300 border-green-300 dark:border-green-700",
  },
  Pending: {
    icon: <Hourglass className="size-4 text-yellow-500" />,
    badgeClass: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300 border-yellow-300 dark:border-yellow-700",
  },
  Rejected: {
    icon: <XCircle className="size-4 text-red-500" />,
    badgeClass: "bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300 border-red-300 dark:border-red-700",
  },
   Resolved: {
    icon: <CheckCircle className="size-4 text-blue-500" />,
    badgeClass: "bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300 border-blue-300 dark:border-blue-700",
  },
};

const BookingConfirmationPDF = ({ booking, hall }: { booking: Booking; hall: Hall | undefined }) => {
  if (!hall) return null;

  return (
    <div id={`pdf-content-${booking.id}`} className="p-4 bg-white text-black text-sm font-sans" style={{ width: '595px', position: 'absolute', left: '-9999px', zIndex: -1, top: 0 }}>
        <div className="border-b-2 border-gray-200 pb-4 mb-4">
            <h1 className="text-3xl font-bold text-gray-800">Hallway Booking Confirmation</h1>
            <p className="text-gray-500">Seminar Hall Booking System</p>
        </div>
        <h2 className="text-xl font-semibold mb-4 text-gray-700">Booking Details (ID: {booking.id})</h2>
        <div className="grid grid-cols-2 gap-x-8 gap-y-4">
            <div>
                <p className="font-bold text-gray-600">Event Name</p>
                <p>{booking.eventName}</p>
            </div>
            <div>
                <p className="font-bold text-gray-600">Hall Name</p>
                <p>{hall.name}</p>
            </div>
            <div>
                <p className="font-bold text-gray-600">Date</p>
                <p>{format(booking.date, 'MMMM dd, yyyy')}</p>
            </div>
            <div>
                <p className="font-bold text-gray-600">Time</p>
                <p>{booking.startTime} - {booking.endTime}</p>
            </div>
            <div className="col-span-2">
                <p className="font-bold text-gray-600">Event Description</p>
                <p>{booking.eventDescription}</p>
            </div>
             <div className="col-span-2">
                <p className="font-bold text-gray-600">Status</p>
                <p className="text-green-600 font-semibold">{booking.status}</p>
            </div>
        </div>
        <div className="mt-8 pt-4 border-t-2 border-gray-200 text-center text-xs text-gray-400">
            <p>&copy; {new Date().getFullYear()} Hallway. All rights reserved.</p>
        </div>
    </div>
  );
};


export default function BookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>(mockBookings);
  const [pdfToRender, setPdfToRender] = useState<{booking: Booking, hall: Hall | undefined} | null>(null);
  const { toast } = useToast();

  const handleBookingAction = (bookingId: string, newStatus: 'Approved' | 'Rejected') => {
    setBookings(currentBookings => 
      currentBookings.map(booking => 
        booking.id === bookingId ? { ...booking, status: newStatus } : booking
      )
    );
    toast({
      title: `Booking ${newStatus}`,
      description: `The booking request has been successfully ${newStatus.toLowerCase()}.`,
    });
  };

  const handleDownloadPdf = (booking: Booking) => {
    const hall = mockHalls.find(h => h.id === booking.hallId);
    setPdfToRender({ booking, hall });
  };

  React.useEffect(() => {
    if (pdfToRender) {
      const { booking, hall } = pdfToRender;
      const input = document.getElementById(`pdf-content-${booking.id}`);

      if (input && hall) {
        html2canvas(input, { scale: 2 })
          .then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();
            const imgWidth = canvas.width;
            const imgHeight = canvas.height;
            const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
            const imgX = (pdfWidth - imgWidth * ratio) / 2;
            const imgY = 15;
            pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
            pdf.save(`booking-confirmation-${booking.id}.pdf`);
            toast({
              title: "PDF Downloaded",
              description: "Booking confirmation has been downloaded.",
            });
          })
          .finally(() => {
            setPdfToRender(null); // Clean up after download
          });
      }
    }
  }, [pdfToRender, toast]);

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h1 className="font-headline text-3xl font-bold tracking-tight">
          My Bookings
        </h1>
      </div>
      <p className="text-muted-foreground">
        Here is a list of your seminar hall booking requests.
      </p>

      {pdfToRender && <BookingConfirmationPDF booking={pdfToRender.booking} hall={pdfToRender.hall} />}

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Event</TableHead>
                <TableHead className="hidden md:table-cell">Hall</TableHead>
                <TableHead className="hidden sm:table-cell">Date</TableHead>
                <TableHead className="hidden sm:table-cell">Time</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bookings.map((booking) => {
                const hall = mockHalls.find(h => h.id === booking.hallId);
                const statusInfo = statusConfig[booking.status];
                return (
                  <TableRow key={booking.id}>
                    <TableCell>
                      <div className="font-medium">{booking.eventName}</div>
                      <div className="text-sm text-muted-foreground md:hidden">
                        {hall?.name}
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">{hall?.name}</TableCell>
                    <TableCell className="hidden sm:table-cell">{format(booking.date, 'MMM dd, yyyy')}</TableCell>
                    <TableCell className="hidden sm:table-cell">{booking.startTime} - {booking.endTime}</TableCell>
                    <TableCell>
                       <Badge className={cn("flex items-center justify-center gap-1.5", statusInfo.badgeClass)}>
                        {statusInfo.icon}
                        {booking.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      {booking.status === 'Pending' ? (
                        <div className="flex gap-2 justify-end">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="bg-green-500 hover:bg-green-600 text-white"
                            onClick={() => handleBookingAction(booking.id, 'Approved')}
                          >
                            <Check className="size-4 mr-1" /> Approve
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="bg-red-500 hover:bg-red-600 text-white"
                            onClick={() => handleBookingAction(booking.id, 'Rejected')}
                          >
                            <X className="size-4 mr-1" /> Reject
                          </Button>
                        </div>
                      ) : booking.status === 'Approved' ? (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDownloadPdf(booking)}
                        >
                          <Download className="size-4 mr-1" />
                          PDF
                        </Button>
                      ) : null}
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
