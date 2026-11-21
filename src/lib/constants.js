import {
  HardHat, Camera, Truck, Tractor, Laptop, PartyPopper,
  CalendarCheck, Heart, UserCircle, LayoutDashboard, PlusCircle, Boxes, ClipboardList, Users, PackageCheck, ReceiptText,
} from "lucide-react";

export const APP_NAME = "RigRent";
export const ROLES = { CUSTOMER: "customer", OWNER: "owner", ADMIN: "admin" };

export const CATEGORIES = [
  { name: "Construction Equipment", short: "Construction", icon: HardHat },
  { name: "Photography Equipment", short: "Photography", icon: Camera },
  { name: "Vehicles & Transportation", short: "Vehicles", icon: Truck },
  { name: "Agriculture Equipment", short: "Agriculture", icon: Tractor },
  { name: "Electronics", short: "Electronics", icon: Laptop },
  { name: "Event Equipment", short: "Event", icon: PartyPopper },
];

export const RENTAL_TYPES = [
  { value: "daily", label: "Daily", unit: "day" },
  { value: "weekly", label: "Weekly", unit: "week" },
  { value: "monthly", label: "Monthly", unit: "month" },
];

export const CONDITIONS = ["Like new", "Excellent", "Good", "Fair"];

export const SORT_OPTIONS = [
  { value: "recent", label: "Recently added" },
  { value: "price-asc", label: "Price: low to high" },
  { value: "price-desc", label: "Price: high to low" },
];

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "All Equipment", href: "/equipment" },
  { label: "How it Works", href: "/#how-it-works" },
  { label: "About Us", href: "/#about" },
  { label: "Contact Us", href: "/#contact" },
];

export const DASHBOARD_HOME = {
  customer: "/dashboard/customer/rentals",
  owner: "/dashboard/owner/overview",
  admin: "/dashboard/admin/overview",
};

export const DASHBOARD_NAV = {
  customer: [
    { label: "My Rentals", href: "/dashboard/customer/rentals", icon: CalendarCheck },
    { label: "Favorites", href: "/dashboard/customer/favorites", icon: Heart },
    { label: "Profile", href: "/dashboard/profile", icon: UserCircle },
  ],
  owner: [
    { label: "Analytics", href: "/dashboard/owner/overview", icon: LayoutDashboard },
    { label: "Add Equipment", href: "/dashboard/owner/add-equipment", icon: PlusCircle },
    { label: "My Equipment", href: "/dashboard/owner/my-equipment", icon: Boxes },
    { label: "My Equipment Rentals", href: "/dashboard/owner/rentals", icon: ClipboardList },
    { label: "My Profile", href: "/dashboard/profile", icon: UserCircle },
  ],
  admin: [
    { label: "Analytics", href: "/dashboard/admin/overview", icon: LayoutDashboard },
    { label: "All Users", href: "/dashboard/admin/users", icon: Users },
    { label: "All Equipment", href: "/dashboard/admin/equipment", icon: PackageCheck },
    { label: "All Rentals", href: "/dashboard/admin/rentals", icon: ReceiptText },
    { label: "My Profile", href: "/dashboard/profile", icon: UserCircle },
  ],
};
