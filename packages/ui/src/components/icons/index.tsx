import { BuildingIcon } from "@unified/ui/components/icons/building";
import { Calendar, CalendarFill } from "@unified/ui/components/icons/calendar";
import { Door, DoorFill } from "@unified/ui/components/icons/door";
import { GoogleCalendar } from "@unified/ui/components/icons/google-calendar";
import { GoogleMeet } from "@unified/ui/components/icons/google-meet";
import { Home, HomeFill } from "@unified/ui/components/icons/home";
import { LogoSvg } from "@unified/ui/components/icons/logo";
import { Mail, MailFill } from "@unified/ui/components/icons/mail";
import { Messages, MessagesFill } from "@unified/ui/components/icons/messages";
import { Pdf } from "@unified/ui/components/icons/pdf";
import { Slack } from "@unified/ui/components/icons/slack";
import { Zoom } from "@unified/ui/components/icons/zoom";
import { Check, Copy, Loader2, LogOut } from "lucide-react";
import { BsGrid, BsGridFill } from "react-icons/bs";
import { IoLayers, IoLayersOutline } from "react-icons/io5";
import { PiUsers, PiUsersFill } from "react-icons/pi";

export const Icons = {
	SignOut: LogOut,
	Copy,
	Check,
	Loader: Loader2,
	Logo: LogoSvg,
	Building: BuildingIcon,
	GoogleMeet: GoogleMeet,
	Zoom,
	Slack,
	GoogleCalendar,
	Pdf,
	Calendar,
	CalendarFill,
	Messages,
	MessagesFill,
	Home,
	HomeFill,
	Layers: IoLayersOutline,
	LayersFill: IoLayers,
	Grid: BsGrid,
	GridFill: BsGridFill,
	Users: PiUsers,
	UsersFill: PiUsersFill,
	Mail,
	MailFill,
	Door,
	DoorFill,
};
