import React, { useState, useEffect, useRef, useMemo } from "react";

import { useParams ,useNavigate , Routes , Route ,Link } from "react-router";
import gsap from "gsap";
import {
  LayoutDashboard, ClipboardList, Users, Briefcase, FileText,
  BarChart3, Settings, LogOut, Search, Filter, Eye, GraduationCap,
  UserCheck, ChevronLeft, Copy, Check, Menu, Phone, Calendar,
  Shield, Clock, MapPin, Hash, Home, X, ArrowLeft, ChevronRight,
  TrendingUp, Activity, AlertCircle, CheckCircle2, User
} from "lucide-react";

// ═══════════════════════════════════════════════════════════════
// REAL DATA FROM API
// ═══════════════════════════════════════════════════════════════

const profilesData = [
  {
    "id": "b47189e8-21c0-487c-9de9-b60a16537b36",
    "user_id": "c0c04e00-6349-4200-9811-b2abbf4fc7c0",
    "name": "Rajesh Kumar",
    "role": "student",
    "phone": "9876543210",
    "created_at": "2026-06-13T06:53:28.745575Z",
    "student_detail": { "roll_no": "PU12345", "address": "Sector 14, Chandigarh", "hostel": "Hostel No 3" },
    "worker_detail": null
  },
  {
    "id": "4fac3c32-abf4-46cc-b2e2-8a85bb17f067",
    "user_id": "08ed968e-815e-4df4-9ab7-34bd181826d5",
    "name": "string",
    "role": "student",
    "phone": "string",
    "created_at": "2026-06-13T08:10:04.166782Z",
    "student_detail": { "roll_no": "string", "address": "string", "hostel": "string" },
    "worker_detail": null
  },
  {
    "id": "8790e363-13ee-4b7b-9945-126625d47f84",
    "user_id": "c2a65fb0-2def-4745-9cfc-1d6ae4148830",
    "name": "string",
    "role": "student",
    "phone": "string",
    "created_at": "2026-06-13T08:10:24.166429Z",
    "student_detail": { "roll_no": "string", "address": "string", "hostel": "string" },
    "worker_detail": null
  },
  {
    "id": "57e320fa-3655-4efd-8a8d-054abe2ae328",
    "user_id": "147f2aa7-0fc5-4591-9f8a-6109565e57ff",
    "name": "string",
    "role": "worker",
    "phone": "string",
    "created_at": "2026-06-13T11:57:34.964788Z",
    "student_detail": null,
    "worker_detail": { "employee_id": "string", "zone": "string" }
  },
  {
    "id": "e5871f94-e34e-48c0-8e60-438fbbf0b684",
    "user_id": "46fce304-df45-47f4-aa8d-c508b257d7ab",
    "name": "string",
    "role": "student",
    "phone": "string",
    "created_at": "2026-06-15T16:16:50.549039Z",
    "student_detail": { "roll_no": "string", "address": "string", "hostel": null },
    "worker_detail": null
  },
  {
    "id": "e40b9f7b-4bd5-4a4c-9853-395d40ce924b",
    "user_id": "e812467f-0ff3-4525-bcc0-71944bb1fe90",
    "name": "string",
    "role": "student",
    "phone": null,
    "created_at": "2026-06-15T16:17:47.479604Z",
    "student_detail": null,
    "worker_detail": null
  },
  {
    "id": "9cacc2c7-8c6d-4265-85fe-ca60bb353152",
    "user_id": "221727f5-7d69-48f3-902f-109bbb0393c5",
    "name": "string",
    "role": "student",
    "phone": null,
    "created_at": "2026-06-15T16:18:11.788042Z",
    "student_detail": { "roll_no": "string", "address": null, "hostel": null },
    "worker_detail": null
  },
  {
    "id": "49a4db74-cc37-47ac-a056-71c512836dfa",
    "user_id": "af24fd56-8d5e-40ca-96b8-dd7e29e3f291",
    "name": "string",
    "role": "worker",
    "phone": null,
    "created_at": "2026-06-15T16:21:06.350919Z",
    "student_detail": null,
    "worker_detail": { "employee_id": null, "zone": null }
  },
  {
    "id": "218ef319-4048-442e-8e45-00a810bdc51c",
    "user_id": "a6782549-4eeb-4ab7-93d9-5e30652914a9",
    "name": "vishal shakya",
    "role": "student",
    "phone": "9855104673",
    "created_at": "2026-06-15T18:39:17.357991Z",
    "student_detail": null,
    "worker_detail": null
  },
  {
    "id": "af25c107-8117-4b34-aa5d-7eb86304366d",
    "user_id": "50fceb69-b8ac-4840-936a-b2351a6b19df",
    "name": "vishal shakya",
    "role": "student",
    "phone": "9855104673",
    "created_at": "2026-06-15T18:39:57.354320Z",
    "student_detail": null,
    "worker_detail": null
  },
  {
    "id": "e96cd10e-9efa-4c8d-98ee-64eac60336cf",
    "user_id": "7b441218-6879-4640-8957-e8415bab5c8f",
    "name": "anmo",
    "role": "student",
    "phone": "9855104673",
    "created_at": "2026-06-15T18:42:15.335034Z",
    "student_detail": null,
    "worker_detail": null
  },
  {
    "id": "b8f0180c-e55e-48dd-9fc5-67ae14a0400c",
    "user_id": "0c02f0ba-8c6e-4ec1-94eb-82d1c8227ad0",
    "name": "string",
    "role": "worker",
    "phone": null,
    "created_at": "2026-06-16T17:46:10.154075Z",
    "student_detail": null,
    "worker_detail": { "employee_id": null, "zone": null }
  },
  {
    "id": "9ad51b1f-4525-41c6-a2f3-b3540ae6d42a",
    "user_id": "d8f23c98-8fe3-4912-9fae-467b7e166ee1",
    "name": "nikita",
    "role": "worker",
    "phone": "9855104673",
    "created_at": "2026-06-16T17:53:16.203063Z",
    "student_detail": null,
    "worker_detail": { "employee_id": null, "zone": "chandigarh" }
  },
  {
    "id": "45583e0e-e9ba-4474-b8ce-b6f76f603e1a",
    "user_id": "2457cfb2-8167-41d1-ab83-cf9e278f470a",
    "name": "aakash",
    "role": "student",
    "phone": "9855104673",
    "created_at": "2026-06-16T17:54:53.263961Z",
    "student_detail": null,
    "worker_detail": null
  },
  {
    "id": "82e86afd-f24f-437f-b90f-dbfe10dd8bd8",
    "user_id": "fc22d1da-aa3e-4b08-b942-fec8c619e2e1",
    "name": "aakash",
    "role": "worker",
    "phone": "9855104673",
    "created_at": "2026-06-16T17:55:24.691306Z",
    "student_detail": null,
    "worker_detail": { "employee_id": null, "zone": "bzbxkdn" }
  },
  {
    "id": "e77eea46-cd7d-44f4-af99-729e1f5ca909",
    "user_id": "eecfe231-9f7d-477b-acd2-5c0a0fd0d026",
    "name": "ueibsskn",
    "role": "student",
    "phone": "9855104673",
    "created_at": "2026-06-16T18:06:03.203188Z",
    "student_detail": null,
    "worker_detail": null
  },
  {
    "id": "58a02817-7957-44a9-a991-d797afe47343",
    "user_id": "b839f981-5ae4-45f0-9936-461f61b36df7",
    "name": "string",
    "role": "student",
    "phone": null,
    "created_at": "2026-06-16T18:11:35.031117Z",
    "student_detail": null,
    "worker_detail": null
  },
  {
    "id": "e4d586d7-2d04-475b-af14-2da1d6f359af",
    "user_id": "6706bdd2-e719-44b7-8859-cadc81fe3f28",
    "name": "string",
    "role": "student",
    "phone": null,
    "created_at": "2026-06-16T18:14:49.229578Z",
    "student_detail": null,
    "worker_detail": null
  },
  {
    "id": "520d1ff0-4c69-45f7-9f27-705e4c89d414",
    "user_id": "11bc75a6-b341-4f99-a1ee-2dbe0fad5bc9",
    "name": "string",
    "role": "student",
    "phone": null,
    "created_at": "2026-06-16T18:15:44.920751Z",
    "student_detail": { "roll_no": "52342352352", "address": null, "hostel": null },
    "worker_detail": null
  },
  {
    "id": "8e7c7d5f-549f-422c-9244-68aaf649b00b",
    "user_id": "dd4dabd0-0f39-41b4-a50d-9ed50522951a",
    "name": "string",
    "role": "worker",
    "phone": null,
    "created_at": "2026-06-16T18:16:32.764179Z",
    "student_detail": null,
    "worker_detail": { "employee_id": null, "zone": null }
  },
  {
    "id": "0924a466-f004-4079-81d5-5b080af0922f",
    "user_id": "a0d2d112-5168-4b96-a757-c3d2e68ea3dc",
    "name": "string",
    "role": "worker",
    "phone": null,
    "created_at": "2026-06-16T18:17:24.909277Z",
    "student_detail": null,
    "worker_detail": { "employee_id": null, "zone": null }
  },
  {
    "id": "19ee565e-3ff9-4e39-9188-d2a195376b1e",
    "user_id": "58c18538-636f-4c02-b870-370d4a0ebf96",
    "name": "v8shal",
    "role": "student",
    "phone": "9855104673",
    "created_at": "2026-06-16T18:42:44.321984Z",
    "student_detail": null,
    "worker_detail": null
  },
  {
    "id": "dd2dbcb3-91f7-4dfa-882f-b995b529d472",
    "user_id": "31595f77-28d3-4296-993e-b79c01814804",
    "name": "vishal",
    "role": "student",
    "phone": "9855104673",
    "created_at": "2026-06-16T19:04:17.215860Z",
    "student_detail": { "roll_no": "628736767", "address": "idhsjsnkd", "hostel": "jxbxkxb" },
    "worker_detail": null
  },
  {
    "id": "b3ca7e95-35a6-4c53-a2c2-0dd48ef1cd7b",
    "user_id": "58218d86-df56-4078-ada9-6fb81c1b944e",
    "name": "chakit",
    "role": "student",
    "phone": "9855104673",
    "created_at": "2026-06-17T03:44:07.497262Z",
    "student_detail": { "roll_no": "4674347799", "address": "ft gddyhx", "hostel": "gxyhuzr" },
    "worker_detail": null
  },
  {
    "id": "a27b7091-c70b-4fbf-8582-76f4300b296c",
    "user_id": "cee974d6-6418-4048-ac85-5db119bcd22e",
    "name": "string",
    "role": "worker",
    "phone": "string",
    "created_at": "2026-06-17T04:13:47.043742Z",
    "student_detail": null,
    "worker_detail": { "employee_id": "string", "zone": "string" }
  },
  {
    "id": "80b059e8-35c4-4ffd-8452-3b668553e791",
    "user_id": "5fa51fcc-014e-48fe-9059-1d74d36938d5",
    "name": "bluwhaleadmin",
    "role": "admin",
    "phone": null,
    "created_at": "2026-06-17T04:16:53.788370Z",
    "student_detail": null,
    "worker_detail": null
  },
  {
    "id": "b71e4256-6368-4e68-bae1-811776bce541",
    "user_id": "ec5a7c44-2034-42be-b121-4b6f7903bbbe",
    "name": "muskan",
    "role": "student",
    "phone": "9855104673",
    "created_at": "2026-06-17T09:50:13.801117Z",
    "student_detail": { "roll_no": "123456", "address": "jdjdndk", "hostel": "hoxbxjdb" },
    "worker_detail": null
  },
  {
    "id": "cbebea1b-c77c-4f54-a3ac-0f81072a9b4d",
    "user_id": "a792513d-0c4c-429f-a367-4573183d8a20",
    "name": "nancy",
    "role": "worker",
    "phone": "9855104676",
    "created_at": "2026-06-17T10:08:11.109502Z",
    "student_detail": null,
    "worker_detail": { "employee_id": "1234", "zone": "pu campus" }
  },
  {
    "id": "29fad152-436c-4c3d-924e-37007a18f2a8",
    "user_id": "77ed84da-6780-47a3-aff4-2915a69cc43f",
    "name": "billu",
    "role": "student",
    "phone": "9855104676",
    "created_at": "2026-06-19T09:58:50.666920Z",
    "student_detail": { "roll_no": "123456", "address": "chandigarh", "hostel": "chandigarh" },
    "worker_detail": null
  },
  {
    "id": "f999e055-08c6-471b-bfc8-8bf68ae651bb",
    "user_id": "a92a3398-3b4c-4dca-8ad0-a919712d4fab",
    "name": "Kartikey",
    "role": "student",
    "phone": "7657657655",
    "created_at": "2026-06-20T11:54:42.546742Z",
    "student_detail": { "roll_no": "123456", "address": "string", "hostel": "string" },
    "worker_detail": null
  },
  {
    "id": "8319a9aa-3849-4990-ba64-3951a91c14ac",
    "user_id": "280412ae-82c7-4171-be12-a4b5834418ca",
    "name": "Test Student",
    "role": "student",
    "phone": null,
    "created_at": "2026-06-21T06:20:05.063429Z",
    "student_detail": { "roll_no": "ROLL6865", "address": "Hostel 4", "hostel": "H4" },
    "worker_detail": null
  },
  {
    "id": "784051b0-e866-4bff-8f67-288f9f6214b9",
    "user_id": "188ac2be-d523-4306-8e7c-3827479d0144",
    "name": "Test Student",
    "role": "student",
    "phone": null,
    "created_at": "2026-06-21T06:20:18.976728Z",
    "student_detail": { "roll_no": "ROLL8796", "address": "Hostel 4", "hostel": "H4" },
    "worker_detail": null
  },
  {
    "id": "1e82dc39-0539-4326-b246-e54fcf3fb4c5",
    "user_id": "9753fad6-00b5-4120-ab6e-a9e0b85701d5",
    "name": "Test Student",
    "role": "student",
    "phone": null,
    "created_at": "2026-06-21T06:20:34.077026Z",
    "student_detail": { "roll_no": "ROLL6865", "address": "Hostel 4", "hostel": "H4" },
    "worker_detail": null
  },
  {
    "id": "aa5de80c-333c-4c59-973a-3303260d496a",
    "user_id": "4f9653e8-cdb7-4560-8280-d7abb98b48f3",
    "name": "Test Student",
    "role": "student",
    "phone": null,
    "created_at": "2026-06-21T06:28:59.729440Z",
    "student_detail": { "roll_no": "ROLL3739", "address": "Hostel 4", "hostel": "H4" },
    "worker_detail": null
  },
  {
    "id": "e21c6bad-f47f-4147-8acf-0598f5a96861",
    "user_id": "167586a7-57c0-45f8-ac3e-cdbaee60229a",
    "name": "Kartikey",
    "role": "student",
    "phone": "9876543214",
    "created_at": "2026-06-21T08:11:44.735715Z",
    "student_detail": { "roll_no": "1234456", "address": "string", "hostel": "string" },
    "worker_detail": null
  },
  {
    "id": "7ea34fae-8ef9-45b8-bc59-b46b446e541a",
    "user_id": "2aaba950-20bb-414d-9b07-85ae29c98e28",
    "name": "admin",
    "role": "admin",
    "phone": "654345675",
    "created_at": "2026-06-22T03:56:41.751011Z",
    "student_detail": null,
    "worker_detail": null
  },
  {
    "id": "280417bd-884d-40df-b60f-2317f59b16dc",
    "user_id": "417b500f-cea7-4461-b8c4-f0bb8f155794",
    "name": "student",
    "role": "student",
    "phone": "654895675",
    "created_at": "2026-06-22T04:00:17.076920Z",
    "student_detail": { "roll_no": "122156", "address": "string", "hostel": "string" },
    "worker_detail": null
  },
  {
    "id": "050954a6-c336-4161-ba77-f0122d7f0463",
    "user_id": "45255310-4095-4d67-8c53-0872804994f6",
    "name": "string",
    "role": "admin",
    "phone": null,
    "created_at": "2026-06-22T04:07:50.093491Z",
    "student_detail": null,
    "worker_detail": null
  }
];

// ═══════════════════════════════════════════════════════════════
// MOCK REPORTS DATA (per user)
// ═══════════════════════════════════════════════════════════════

const reportsByUser = {
  "b47189e8-21c0-487c-9de9-b60a16537b36": [
    { id: "r1", title: "Block 3 UIET Washroom", status: "Pending", date: "21 Jun 2026", image: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=120&h=80&fit=crop" },
    { id: "r2", title: "Hostel No 3 Corridor", status: "Completed", date: "19 Jun 2026", image: "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?w=120&h=80&fit=crop" },
  ],
  "218ef319-4048-442e-8e45-00a810bdc51c": [
    { id: "r3", title: "Library Reading Hall", status: "Pending", date: "21 Jun 2026", image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=120&h=80&fit=crop" },
    { id: "r4", title: "Canteen Area Cleanup", status: "Assigned", date: "20 Jun 2026", image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=120&h=80&fit=crop" },
  ],
  "9ad51b1f-4525-41c6-a2f3-b3540ae6d42a": [
    { id: "r5", title: "Sector 14 Park", status: "Completed", date: "18 Jun 2026", image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=120&h=80&fit=crop" },
  ],
};

// ═══════════════════════════════════════════════════════════════
// UTILITY FUNCTIONS
// ═══════════════════════════════════════════════════════════════

const getInitials = (name) => {
  if (!name || name === "string") return "??";
  return name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
};

const formatDate = (isoString) => {
  if (!isoString) return "N/A";
  const d = new Date(isoString);
  return d.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
};

const formatDateTime = (isoString) => {
  if (!isoString) return "N/A";
  const d = new Date(isoString);
  return d.toLocaleString("en-IN", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });
};

const getRoleColor = (role) => {
  const colors = {
    student: "bg-emerald-50 text-emerald-700 border-emerald-200",
    worker: "bg-amber-50 text-amber-700 border-amber-200",
    admin: "bg-violet-50 text-violet-700 border-violet-200",
  };
  return colors[role?.toLowerCase()] || colors.student;
};

const getStatusColor = (status) => {
  const colors = {
    Pending: "bg-orange-50 text-orange-700 border-orange-200",
    Assigned: "bg-blue-50 text-blue-700 border-blue-200",
    Completed: "bg-emerald-50 text-emerald-700 border-emerald-200",
    Rejected: "bg-red-50 text-red-700 border-red-200",
  };
  return colors[status] || colors.Pending;
};

const getRoleIcon = (role) => {
  if (role === "student") return GraduationCap;
  if (role === "worker") return Briefcase;
  if (role === "admin") return Shield;
  return User;
};

// ═══════════════════════════════════════════════════════════════
// REUSABLE COMPONENTS
// ═══════════════════════════════════════════════════════════════

const Sidebar = ({ activeItem, mobileOpen, onClose }) => {
  const menuItems = [
    { label: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
    { label: "Tasks", icon: ClipboardList, path: "/tasks" },
    { label: "Users / Profiles", icon: Users, path: "/users" },
    { label: "Workers", icon: Briefcase, path: "/workers" },
    { label: "Reports", icon: FileText, path: "/reports" },
    { label: "Analytics", icon: BarChart3, path: "/analytics" },
    { label: "Settings", icon: Settings, path: "/settings" },
  ];

  return (
    <>
      {mobileOpen && (
        <div className="fixed inset-0 bg-black/40 z-40 lg:hidden" onClick={onClose} />
      )}
      <aside
        className={`fixed lg:sticky lg:top-0 inset-y-0 left-0 z-50 w-64 flex flex-col
          bg-[#0F172A] text-slate-300 transition-transform duration-300 h-screen
          ${mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
      >
        {/* Logo */}
        <div className="px-6 py-5 border-b border-slate-700/50">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#2563EB] flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-white font-bold text-sm leading-tight">Swachh PU</h1>
              <p className="text-[10px] text-slate-400 uppercase tracking-wider">Admin Panel</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
          {menuItems.map((item) => {
            const isActive = item.label === activeItem;
            const Icon = item.icon;
            return (
              <Link
                key={item.label}
                to={item.path}
                onClick={onClose}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-200 group
                  ${isActive ? "bg-[#2563EB]/15 text-[#2563EB] font-medium" : "hover:bg-slate-800/60 hover:text-white"}`}
              >
                <Icon className={`w-[18px] h-[18px] ${isActive ? "text-[#2563EB]" : "text-slate-400 group-hover:text-slate-200"}`} />
                <span>{item.label}</span>
                {isActive && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-[#2563EB]" />}
              </Link>
            );
          })}
        </nav>

        {/* Bottom */}
        <div className="px-4 py-4 border-t border-slate-700/50 space-y-3">
          <div className="flex items-center gap-3 px-2">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#2563EB] to-violet-600 flex items-center justify-center text-white text-xs font-bold">
              AD
            </div>
            <div className="min-w-0">
              <p className="text-white text-sm font-medium truncate">Admin User</p>
              <p className="text-xs text-slate-400 truncate">admin@pu.edu.in</p>
            </div>
          </div>
          <button className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-red-400 hover:bg-red-500/10 transition-colors">
            <LogOut className="w-4 h-4" /> Logout
          </button>
        </div>
      </aside>
    </>
  );
};

const StatCard = ({ title, value, icon: Icon, delay = 0, trend }) => {
  const cardRef = useRef(null);
  useEffect(() => {
    if (cardRef.current) {
      gsap.fromTo(cardRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, delay, ease: "power2.out" });
    }
  }, [delay]);

  return (
    <div ref={cardRef} className="bg-white rounded-xl border border-slate-200/80 shadow-sm p-5 hover:shadow-md hover:border-slate-300 transition-all duration-300 cursor-default group">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">{title}</p>
          <p className="text-2xl font-bold text-slate-900 group-hover:text-[#2563EB] transition-colors">{value}</p>
          {trend && (
            <div className="flex items-center gap-1 mt-1.5">
              <TrendingUp className="w-3 h-3 text-emerald-500" />
              <span className="text-[10px] text-emerald-600 font-medium">{trend}</span>
            </div>
          )}
        </div>
        <div className="w-10 h-10 rounded-lg bg-[#2563EB]/8 flex items-center justify-center group-hover:bg-[#2563EB]/15 transition-colors">
          <Icon className="w-5 h-5 text-[#2563EB]" />
        </div>
      </div>
    </div>
  );
};

const CopyButton = ({ text }) => {
  const [copied, setCopied] = useState(false);
  const handleCopy = async () => {
    try { await navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 2000); } catch {}
  };
  return (
    <button onClick={handleCopy} className="p-1.5 rounded-md hover:bg-slate-100 text-slate-400 hover:text-[#2563EB] transition-all" title="Copy">
      {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
    </button>
  );
};

const RoleBadge = ({ role }) => (
  <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium border capitalize ${getRoleColor(role)}`}>
    {React.createElement(getRoleIcon(role), { className: "w-3 h-3" })}
    {role}
  </span>
);

const StatusBadge = ({ status }) => (
  <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusColor(status)}`}>
    {status}
  </span>
);

// ═══════════════════════════════════════════════════════════════
// USER LIST PAGE
// ═══════════════════════════════════════════════════════════════

const UserListPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("All Roles");
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");




  const fetchProfiles = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        "https://swachh-pu-backend.onrender.com/profiles/public/list"
      );

      if (!response.ok) {
        throw new Error("Failed to fetch profiles");
      }

      const data = await response.json();

      // Store API response in state
      console.log(data.profiles);
      setProfiles(data.profiles);
    } catch (err) {
      setError(err.message);
      console.error("Error fetching profiles:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfiles();
  }, []);

  const mainRef = useRef(null);
  const statsRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
    tl.fromTo(mainRef.current?.querySelector(".page-header"), { opacity: 0, y: -10 }, { opacity: 1, y: 0, duration: 0.4 })
      .fromTo(statsRef.current?.children, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.4, stagger: 0.08 }, "-=0.2");
    return () => tl.kill();
  }, []);

  const filteredUsers = useMemo(() => {
    return profiles.filter((user) => {
      const q = searchQuery.toLowerCase();
      const matchesSearch = user.name?.toLowerCase().includes(q) || user.phone?.includes(q) || user.user_id?.toLowerCase().includes(q);
      const matchesRole = roleFilter === "All Roles" || user.role?.toLowerCase() === roleFilter.toLowerCase();
      return matchesSearch && matchesRole;
    });
  }, [searchQuery, roleFilter]);

  const stats = {
    total: profiles.length,
    students: profiles.filter((u) => u.role === "student").length,
    workers: profiles.filter((u) => u.role === "worker").length,
    admins: profiles.filter((u) => u.role === "admin").length,
  };

  return (
    
    <>
     {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

    <div className="min-h-screen bg-[#F8FAFC] flex">
      <Sidebar activeItem="Users / Profiles" mobileOpen={mobileSidebarOpen} onClose={() => setMobileSidebarOpen(false)} />

      <main ref={mainRef} className="flex-1 min-w-0 flex flex-col">
        {/* Mobile Header */}
        <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-slate-200/60 px-4 sm:px-6 py-3 flex items-center justify-between lg:hidden">
          <button onClick={() => setMobileSidebarOpen(true)} className="p-2 rounded-lg hover:bg-slate-100 transition-colors">
            <Menu className="w-5 h-5 text-slate-600" />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-md bg-[#2563EB] flex items-center justify-center">
              <Shield className="w-4 h-4 text-white" />
            </div>
            <span className="text-sm font-bold text-slate-900">Swachh PU</span>
          </div>
          <div className="w-8" />
        </header>

        <div className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          {/* Header */}
          <div className="page-header mb-6">
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900">Users / Profiles</h1>
            <p className="text-sm text-slate-500 mt-1">Manage all registered users and view their activity</p>
          </div>

          {/* Stats */}
          <div ref={statsRef} className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
            <StatCard title="Total Users" value={stats.total} icon={Users} delay={0} trend="+12%" />
            <StatCard title="Students" value={stats.students} icon={GraduationCap} delay={0.08} />
            <StatCard title="Workers" value={stats.workers} icon={Briefcase} delay={0.16} />
            <StatCard title="Admins" value={stats.admins} icon={Shield} delay={0.24} />
          </div>

          {/* Search & Filter */}
          <div className="bg-white rounded-xl border border-slate-200/80 shadow-sm p-4 mb-6">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1 min-w-0">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search by name, phone or user ID..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-200 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] transition-all"
                />
              </div>
              <div className="flex gap-2">
                <select value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)}
                  className="px-3 py-2.5 rounded-lg border border-slate-200 text-sm text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] cursor-pointer transition-all">
                  <option>All Roles</option>
                  <option>Student</option>
                  <option>Worker</option>
                  <option>Admin</option>
                </select>
                <button className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#2563EB] text-white text-sm font-medium hover:bg-[#1d4ed8] active:scale-[0.98] transition-all shadow-sm shadow-[#2563EB]/20">
                  <Filter className="w-4 h-4" />
                  <span className="hidden sm:inline">Filter</span>
                </button>
              </div>
            </div>
          </div>

          {/* User Table */}
          <div className="bg-white rounded-xl border border-slate-200/80 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50/60">
                    <th className="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">User</th>
                    <th className="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider hidden sm:table-cell">Role</th>
                    <th className="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider hidden md:table-cell">Phone</th>
                    <th className="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider hidden lg:table-cell">Joined</th>
                    <th className="text-right px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-slate-50/60 transition-colors group">
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#2563EB] to-violet-500 flex items-center justify-center text-white text-xs font-bold shrink-0">
                            {getInitials(user.name)}
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm font-medium text-slate-900 truncate">{user.name}</p>
                            <p className="text-xs text-slate-400 truncate">{user.user_id?.slice(0, 16)}...</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-4 hidden sm:table-cell">
                        <RoleBadge role={user.role} />
                      </td>
                      <td className="px-5 py-4 hidden md:table-cell">
                        <div className="flex items-center gap-1.5 text-sm text-slate-600">
                          <Phone className="w-3.5 h-3.5 text-slate-400" />
                          {user.phone || "—"}
                        </div>
                      </td>
                      <td className="px-5 py-4 hidden lg:table-cell">
                        <div className="flex items-center gap-1.5 text-sm text-slate-500">
                          <Calendar className="w-3.5 h-3.5" />
                          {formatDate(user.created_at)}
                        </div>
                      </td>
                      <td className="px-5 py-4 text-right">
                        <button
                          onClick={() => navigate(`/users/${user.id}`)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-[#2563EB] bg-[#2563EB]/8 hover:bg-[#2563EB]/15 transition-colors"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span className="hidden sm:inline">View</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {filteredUsers.length === 0 && (
              <div className="py-12 text-center">
                <Users className="w-10 h-10 text-slate-300 mx-auto mb-3" />
                <p className="text-sm text-slate-500">No users found</p>
              </div>
            )}
            {/* Pagination / Count */}
            <div className="px-5 py-3 border-t border-slate-100 flex items-center justify-between">
              <p className="text-xs text-slate-400">
                Showing <span className="font-medium text-slate-600">{filteredUsers.length}</span> of <span className="font-medium text-slate-600">{profilesData.length}</span> users
              </p>
            </div>
          </div>
        </div>
      </main>
    </div></>
  );
};

// ═══════════════════════════════════════════════════════════════
// PROFILE DETAIL PAGE
// ═══════════════════════════════════════════════════════════════

const ProfileDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const pageRef = useRef(null);

  const user = useMemo(() => profilesData.find((p) => p.id === id), [id]);
  const reports = reportsByUser[id] || [];

  useEffect(() => {
    window.scrollTo(0, 0);
    if (pageRef.current) {
      gsap.fromTo(pageRef.current.querySelectorAll(".animate-in"), { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.4, stagger: 0.06, ease: "power2.out" });
    }
  }, [id]);

  if (!user) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-slate-300 mx-auto mb-4" />
          <h2 className="text-lg font-semibold text-slate-900">User not found</h2>
          <button onClick={() => navigate("/users")} className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#2563EB] text-white text-sm font-medium hover:bg-[#1d4ed8] transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Users
          </button>
        </div>
      </div>
    );
  }

  const activitySummary = {
    totalReports: reports.length,
    pending: reports.filter((r) => r.status === "Pending").length,
    assigned: reports.filter((r) => r.status === "Assigned").length,
    completed: reports.filter((r) => r.status === "Completed").length,
    rejected: reports.filter((r) => r.status === "Rejected").length,
  };

  const infoRows = [
    { label: "Profile ID", value: user.id, copyable: true },
    { label: "User ID", value: user.user_id, copyable: true },
    { label: "Name", value: user.name, copyable: false },
    { label: "Role", value: user.role, copyable: false, isRole: true },
    { label: "Phone", value: user.phone || "Not provided", copyable: false },
    { label: "Created At", value: formatDateTime(user.created_at), copyable: false },
  ];

  // Role-specific details
  const detailRows = [];
  if (user.role === "student" && user.student_detail) {
    detailRows.push(
      { label: "Roll Number", value: user.student_detail.roll_no, icon: Hash },
      { label: "Address", value: user.student_detail.address, icon: MapPin },
      { label: "Hostel", value: user.student_detail.hostel, icon: Home },
    );
  } else if (user.role === "worker" && user.worker_detail) {
    detailRows.push(
      { label: "Employee ID", value: user.worker_detail.employee_id, icon: Hash },
      { label: "Zone", value: user.worker_detail.zone, icon: MapPin },
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex">
      <Sidebar activeItem="Users / Profiles" mobileOpen={mobileSidebarOpen} onClose={() => setMobileSidebarOpen(false)} />

      <main ref={pageRef} className="flex-1 min-w-0 flex flex-col">
        {/* Mobile Header */}
        <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-slate-200/60 px-4 sm:px-6 py-3 flex items-center justify-between lg:hidden">
          <button onClick={() => setMobileSidebarOpen(true)} className="p-2 rounded-lg hover:bg-slate-100 transition-colors">
            <Menu className="w-5 h-5 text-slate-600" />
          </button>
          <span className="text-sm font-bold text-slate-900">Profile Details</span>
          <div className="w-8" />
        </header>

        <div className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          {/* Back Button */}
          <button
            onClick={() => navigate("/users")}
            className="animate-in inline-flex items-center gap-2 text-sm font-medium text-[#2563EB] hover:text-[#1d4ed8] mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Users
          </button>

          <div className="max-w-4xl mx-auto space-y-6">
            {/* Profile Header Card */}
            <div className="animate-in bg-white rounded-xl border border-slate-200/80 shadow-sm p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row items-center gap-6">
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-br from-[#2563EB] to-violet-600 flex items-center justify-center text-white text-3xl font-bold shadow-lg shadow-[#2563EB]/20">
                  {getInitials(user.name)}
                </div>
                <div className="text-center sm:text-left flex-1">
                  <h2 className="text-2xl font-bold text-slate-900">{user.name}</h2>
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mt-3">
                    <RoleBadge role={user.role} />
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium border bg-emerald-50 text-emerald-700 border-emerald-200">
                      <CheckCircle2 className="w-3 h-3" /> Active
                    </span>
                  </div>
                </div>
                <div className="flex flex-col gap-2 text-sm text-slate-500 min-w-[140px]">
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-slate-400" />
                    {user.phone || "—"}
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-slate-400" />
                    Joined {formatDate(user.created_at)}
                  </div>
                </div>
              </div>
            </div>

            {/* User Information */}
            <div className="animate-in bg-white rounded-xl border border-slate-200/80 shadow-sm overflow-hidden">
              <div className="px-5 py-4 border-b border-slate-100">
                <h3 className="text-sm font-semibold text-slate-900">User Information</h3>
              </div>
              <div className="divide-y divide-slate-50">
                {infoRows.map((row) => (
                  <div key={row.label} className="flex items-center justify-between px-5 py-3.5 hover:bg-slate-50/40 transition-colors">
                    <span className="text-sm text-slate-500">{row.label}</span>
                    <div className="flex items-center gap-2 max-w-[60%]">
                      {row.isRole ? (
                        <RoleBadge role={row.value} />
                      ) : (
                        <span className="text-sm font-medium text-slate-900 truncate">{row.value}</span>
                      )}
                      {row.copyable && <CopyButton text={row.value} />}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Role-Specific Details */}
            {detailRows.length > 0 && (
              <div className="animate-in bg-white rounded-xl border border-slate-200/80 shadow-sm overflow-hidden">
                <div className="px-5 py-4 border-b border-slate-100">
                  <h3 className="text-sm font-semibold text-slate-900 capitalize">{user.role} Details</h3>
                </div>
                <div className="divide-y divide-slate-50">
                  {detailRows.map((row) => (
                    <div key={row.label} className="flex items-center justify-between px-5 py-3.5 hover:bg-slate-50/40 transition-colors">
                      <div className="flex items-center gap-2 text-sm text-slate-500">
                        <row.icon className="w-4 h-4 text-slate-400" />
                        {row.label}
                      </div>
                      <span className="text-sm font-medium text-slate-900">{row.value || "—"}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Activity Summary */}
            <div className="animate-in bg-white rounded-xl border border-slate-200/80 shadow-sm overflow-hidden">
              <div className="px-5 py-4 border-b border-slate-100">
                <h3 className="text-sm font-semibold text-slate-900">Activity Summary</h3>
              </div>
              <div className="p-5 grid grid-cols-2 sm:grid-cols-5 gap-3">
                {[
                  { label: "Total Reports", value: activitySummary.totalReports, color: "bg-slate-50 border-slate-200 text-slate-700" },
                  { label: "Pending", value: activitySummary.pending, color: "bg-orange-50 border-orange-200 text-orange-700" },
                  { label: "Assigned", value: activitySummary.assigned, color: "bg-blue-50 border-blue-200 text-blue-700" },
                  { label: "Completed", value: activitySummary.completed, color: "bg-emerald-50 border-emerald-200 text-emerald-700" },
                  { label: "Rejected", value: activitySummary.rejected, color: "bg-red-50 border-red-200 text-red-700" },
                ].map((stat) => (
                  <div key={stat.label} className={`rounded-xl border p-4 text-center transition-all hover:shadow-md ${stat.color}`}>
                    <p className="text-xl font-bold">{stat.value}</p>
                    <p className="text-[10px] font-medium mt-1 opacity-80">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Reports Table */}
            <div className="animate-in bg-white rounded-xl border border-slate-200/80 shadow-sm overflow-hidden">
              <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
                <h3 className="text-sm font-semibold text-slate-900">Reports Submitted</h3>
                <span className="text-xs text-slate-400 font-medium">{reports.length} reports</span>
              </div>
              {reports.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-slate-100 bg-slate-50/60">
                        <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Thumbnail</th>
                        <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Task</th>
                        <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                        <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider hidden sm:table-cell">Reported On</th>
                        <th className="text-right px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {reports.map((report) => (
                        <tr key={report.id} className="hover:bg-slate-50/60 transition-colors">
                          <td className="px-5 py-3.5">
                            <img src={report.image} alt={report.title} className="w-16 h-10 object-cover rounded-lg border border-slate-200" loading="lazy" />
                          </td>
                          <td className="px-5 py-3.5">
                            <p className="text-sm font-medium text-slate-900">{report.title}</p>
                          </td>
                          <td className="px-5 py-3.5">
                            <StatusBadge status={report.status} />
                          </td>
                          <td className="px-5 py-3.5 hidden sm:table-cell">
                            <div className="flex items-center gap-1.5 text-sm text-slate-500">
                              <Clock className="w-3.5 h-3.5" />{report.date}
                            </div>
                          </td>
                          <td className="px-5 py-3.5 text-right">
                            <button className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-[#2563EB] bg-[#2563EB]/8 hover:bg-[#2563EB]/15 transition-colors">
                              <Eye className="w-3.5 h-3.5" />
                              <span className="hidden sm:inline">View Task</span>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="py-10 text-center">
                  <FileText className="w-10 h-10 text-slate-300 mx-auto mb-3" />
                  <p className="text-sm text-slate-500">No reports submitted yet</p>
                </div>
              )}
            </div>

            {/* Account Status */}
            <div className="animate-in bg-white rounded-xl border border-slate-200/80 shadow-sm overflow-hidden">
              <div className="px-5 py-4 border-b border-slate-100">
                <h3 className="text-sm font-semibold text-slate-900">Account Status</h3>
              </div>
              <div className="p-5">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-sm font-semibold text-slate-900">Active</span>
                </div>
                <p className="text-sm text-slate-500 leading-relaxed">User is active and can access the system.</p>
                <div className="mt-4 pt-4 border-t border-slate-100 flex items-center gap-2 text-xs text-slate-400">
                  <Clock className="w-3.5 h-3.5" />
                  Last Updated: {formatDate(user.created_at)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════
// MAIN ROUTER WRAPPER
// ═══════════════════════════════════════════════════════════════

const UserManagementPage = () => {
  return (
    // <Routes>
    //   <Route path="/" element={<UserListPage />} />
    //   <Route path="/:id" element={<ProfileDetailPage />} />
    // </Routes>
    <UserListPage/>
  );
};

export default UserManagementPage;