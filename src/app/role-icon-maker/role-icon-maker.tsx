"use client";

import React, { useState, useRef, useEffect } from "react";
import { 
  Crown, Shield, Sword, Star, Gem, Flame, Heart, Zap, Award, Target,
  Sparkles, Bot, Terminal, Code, Cpu, ShieldAlert, Skull, Ghost,
  Download, Search, Layers, Palette, Type, Sliders, Moon, Sun, Anchor,
  Axe, BadgeAlert, BadgeCheck, Bell, Bookmark, Box, Briefcase, Bug,
  Building, Cable, Calculator, Camera, Castle, CircleDot, Compass,
  Coins, Dices, Eye, Feather, Fingerprint, Flag, Flashlight, Folder,
  Gamepad2, Gift, Globe, GraduationCap, Hammer, Headphones, HelpCircle,
  Hourglass, Key, Laptop, Lightbulb, Lock, Magnet, Map, MapPin,
  Megaphone, Mic, Music, Newspaper, Package, Paperclip, Pin, Plane,
  Radio, Rocket, Scissors, Server, ShieldCheck, Shirt, ShoppingBag,
  Smile, Speaker, Trophy, Tv, Wand2, Wrench, RotateCcw, Image as ImageIcon,
  Droplet, EyeOff, Sparkle, Grid, Plus, Minus, Move, Activity, AlertCircle,
  AlertTriangle, Aperture, Archive, AtSign, Battery, BatteryCharging,
  Bluetooth, Book, BookOpen, Calendar, Check, CheckCircle, CheckSquare,
  ChevronDown, ChevronRight, ChevronLeft, Circle, Clipboard,
  Clock, Cloud, CloudDrizzle, CloudLightning, CloudRain, CloudSnow,
  Command, Copy, CreditCard, Crop, Crosshair, Disc, DollarSign, Edit,
  Edit2, Edit3, ExternalLink, File, FileText, Film, Filter,
  Frown, GitBranch, GitCommit, GitMerge, GitPullRequest,
  HardDrive, Hash, Home, Inbox, Info, Layout, LifeBuoy, Link, List, Mail, Maximize, Maximize2, MessageCircle, MessageSquare,
  Minimize, Minimize2, Monitor, MoreHorizontal, MoreVertical, MousePointer,
  Navigation, Octagon, Pause, Percent, Phone, PieChart, Play, PlusCircle,
  Power, Printer, RefreshCw, Repeat, RotateCw, Rss, Save, Send, Settings,
  SaveCheck, X,
  Share, Share2, ShoppingCart, Shuffle, Sidebar, Slash, Smartphone, Square,
  Sunrise, Sunset, Tablet, Tag, Thermometer, ThumbsDown, ThumbsUp, ToggleLeft,
  ToggleRight, Trash, TrendingDown, TrendingUp, Triangle,
  Truck, Umbrella, Unlock, User, UserCheck, UserMinus,
  UserPlus, UserX, Users, Video, Voicemail, Volume, Volume1, Volume2,
  VolumeX, Watch, Wifi, Wind, ZoomIn, ZoomOut, PawPrint, Flower, Clover,
  Cat, Dog, Bird, Fish, Leaf, Snowflake, Rainbow, Orbit, Atom, FlaskConical,
  Medal, PartyPopper, Coffee, Pizza, Cross, Swords, TreePine, Mountain
} from "lucide-react";

const ALL_ICONS = [
  { id: "gamepad", icon: Gamepad2, label: "Gamepad" },
  { id: "sword", icon: Sword, label: "Sword" },
  { id: "axe", icon: Axe, label: "Axe" },
  { id: "shield", icon: Shield, label: "Shield" },
  { id: "crown", icon: Crown, label: "Crown" },
  { id: "trophy", icon: Trophy, label: "Trophy" },
  { id: "target", icon: Target, label: "Target" },
  { id: "dices", icon: Dices, label: "Dices" },
  { id: "skull", icon: Skull, label: "Skull" },
  { id: "ghost", icon: Ghost, label: "Ghost" },
  { id: "wand", icon: Wand2, label: "Wand" },
  { id: "castle", icon: Castle, label: "Castle" },
  { id: "crosshair", icon: Crosshair, label: "Crosshair" },
  { id: "flame", icon: Flame, label: "Flame" },
  { id: "zap", icon: Zap, label: "Zap" },
  { id: "bot", icon: Bot, label: "Bot" },
  { id: "terminal", icon: Terminal, label: "Terminal" },
  { id: "code", icon: Code, label: "Code" },
  { id: "cpu", icon: Cpu, label: "CPU" },
  { id: "server", icon: Server, label: "Server" },
  { id: "laptop", icon: Laptop, label: "Laptop" },
  { id: "bug", icon: Bug, label: "Bug" },
  { id: "cable", icon: Cable, label: "Cable" },
  { id: "radio", icon: Radio, label: "Radio" },
  { id: "tv", icon: Tv, label: "TV" },
  { id: "command", icon: Command, label: "Command" },
  { id: "hard-drive", icon: HardDrive, label: "Hard Drive" },
  { id: "wifi", icon: Wifi, label: "WiFi" },
  { id: "bluetooth", icon: Bluetooth, label: "Bluetooth" },
  { id: "monitor", icon: Monitor, label: "Monitor" },
  { id: "smartphone", icon: Smartphone, label: "Smartphone" },
  { id: "star", icon: Star, label: "Star" },
  { id: "gem", icon: Gem, label: "Gem" },
  { id: "heart", icon: Heart, label: "Heart" },
  { id: "award", icon: Award, label: "Award" },
  { id: "sparkles", icon: Sparkles, label: "Sparkles" },
  { id: "bell", icon: Bell, label: "Bell" },
  { id: "bookmark", icon: Bookmark, label: "Bookmark" },
  { id: "coins", icon: Coins, label: "Coins" },
  { id: "gift", icon: Gift, label: "Gift" },
  { id: "key", icon: Key, label: "Key" },
  { id: "lock", icon: Lock, label: "Lock" },
  { id: "rocket", icon: Rocket, label: "Rocket" },
  { id: "anchor", icon: Anchor, label: "Anchor" },
  { id: "compass", icon: Compass, label: "Compass" },
  { id: "globe", icon: Globe, label: "Globe" },
  { id: "lightbulb", icon: Lightbulb, label: "Lightbulb" },
  { id: "home", icon: Home, label: "Home" },
  { id: "calendar", icon: Calendar, label: "Calendar" },
  { id: "camera", icon: Camera, label: "Camera" },
  { id: "clock", icon: Clock, label: "Clock" },
  { id: "cloud", icon: Cloud, label: "Cloud" },
  { id: "credit-card", icon: CreditCard, label: "Credit Card" },
  { id: "file", icon: File, label: "File" },
  { id: "folder", icon: Folder, label: "Folder" },
  { id: "mail", icon: Mail, label: "Mail" },
  { id: "map", icon: Map, label: "Map" },
  { id: "music", icon: Music, label: "Music" },
  { id: "phone", icon: Phone, label: "Phone" },
  { id: "shopping-cart", icon: ShoppingCart, label: "Cart" },
  { id: "sun", icon: Sun, label: "Sun" },
  { id: "moon", icon: Moon, label: "Moon" },
  { id: "user", icon: User, label: "User" },
  { id: "users", icon: Users, label: "Users" },
  { id: "video", icon: Video, label: "Video" },
  { id: "shield-alert", icon: ShieldAlert, label: "Alert Shield" },
  { id: "shield-check", icon: ShieldCheck, label: "Check Shield" },
  { id: "badge-check", icon: BadgeCheck, label: "Verified" },
  { id: "badge-alert", icon: BadgeAlert, label: "Warning" },
  { id: "eye", icon: Eye, label: "Eye" },
  { id: "flag", icon: Flag, label: "Flag" },
  { id: "fingerprint", icon: Fingerprint, label: "Fingerprint" },
  { id: "check", icon: Check, label: "Check" },
  { id: "check-circle", icon: CheckCircle, label: "Check Circle" },
  { id: "alert-circle", icon: AlertCircle, label: "Alert Circle" },
  { id: "alert-triangle", icon: AlertTriangle, label: "Alert Triangle" },
  { id: "info", icon: Info, label: "Info" },
  { id: "help-circle", icon: HelpCircle, label: "Help" },
  { id: "power", icon: Power, label: "Power" },
  { id: "activity", icon: Activity, label: "Activity" },
  { id: "aperture", icon: Aperture, label: "Aperture" },
  { id: "archive", icon: Archive, label: "Archive" },
  { id: "at-sign", icon: AtSign, label: "At Sign" },
  { id: "battery", icon: Battery, label: "Battery" },
  { id: "battery-charging", icon: BatteryCharging, label: "Battery Charging" },
  { id: "book", icon: Book, label: "Book" },
  { id: "book-open", icon: BookOpen, label: "Book Open" },
  { id: "box", icon: Box, label: "Box" },
  { id: "briefcase", icon: Briefcase, label: "Briefcase" },
  { id: "building", icon: Building, label: "Building" },
  { id: "calculator", icon: Calculator, label: "Calculator" },
  { id: "circle-dot", icon: CircleDot, label: "Circle Dot" },
  { id: "clipboard", icon: Clipboard, label: "Clipboard" },
  { id: "cloud-drizzle", icon: CloudDrizzle, label: "Cloud Drizzle" },
  { id: "cloud-lightning", icon: CloudLightning, label: "Cloud Lightning" },
  { id: "cloud-rain", icon: CloudRain, label: "Cloud Rain" },
  { id: "cloud-snow", icon: CloudSnow, label: "Cloud Snow" },
  { id: "copy", icon: Copy, label: "Copy" },
  { id: "crop", icon: Crop, label: "Crop" },
  { id: "disc", icon: Disc, label: "Disc" },
  { id: "dollar-sign", icon: DollarSign, label: "Dollar Sign" },
  { id: "edit", icon: Edit, label: "Edit" },
  { id: "external-link", icon: ExternalLink, label: "External Link" },
  { id: "feather", icon: Feather, label: "Feather" },
  { id: "film", icon: Film, label: "Film" },
  { id: "filter", icon: Filter, label: "Filter" },
  { id: "flashlight", icon: Flashlight, label: "Flashlight" },
  { id: "graduation-cap", icon: GraduationCap, label: "Graduation Cap" },
  { id: "hammer", icon: Hammer, label: "Hammer" },
  { id: "headphones", icon: Headphones, label: "Headphones" },
  { id: "hourglass", icon: Hourglass, label: "Hourglass" },
  { id: "layers", icon: Layers, label: "Layers" },
  { id: "layout", icon: Layout, label: "Layout" },
  { id: "life-buoy", icon: LifeBuoy, label: "Life Buoy" },
  { id: "link", icon: Link, label: "Link" },
  { id: "magnet", icon: Magnet, label: "Magnet" },
  { id: "map-pin", icon: MapPin, label: "Map Pin" },
  { id: "megaphone", icon: Megaphone, label: "Megaphone" },
  { id: "mic", icon: Mic, label: "Mic" },
  { id: "newspaper", icon: Newspaper, label: "Newspaper" },
  { id: "package", icon: Package, label: "Package" },
  { id: "paperclip", icon: Paperclip, label: "Paperclip" },
  { id: "pin", icon: Pin, label: "Pin" },
  { id: "plane", icon: Plane, label: "Plane" },
  { id: "printer", icon: Printer, label: "Printer" },
  { id: "rss", icon: Rss, label: "Rss" },
  { id: "save", icon: Save, label: "Save" },
  { id: "scissors", icon: Scissors, label: "Scissors" },
  { id: "send", icon: Send, label: "Send" },
  { id: "settings", icon: Settings, label: "Settings" },
  { id: "share", icon: Share, label: "Share" },
  { id: "shirt", icon: Shirt, label: "Shirt" },
  { id: "shopping-bag", icon: ShoppingBag, label: "Shopping Bag" },
  { id: "smile", icon: Smile, label: "Smile" },
  { id: "speaker", icon: Speaker, label: "Speaker" },
  { id: "tag", icon: Tag, label: "Tag" },
  { id: "thermometer", icon: Thermometer, label: "Thermometer" },
  { id: "thumbs-up", icon: ThumbsUp, label: "Thumbs Up" },
  { id: "trash", icon: Trash, label: "Trash" },
  { id: "truck", icon: Truck, label: "Truck" },
  { id: "umbrella", icon: Umbrella, label: "Umbrella" },
  { id: "watch", icon: Watch, label: "Watch" },
  { id: "wind", icon: Wind, label: "Wind" },
  { id: "wrench", icon: Wrench, label: "Wrench" },
  { id: "paw-print", icon: PawPrint, label: "Paw Print" },
  { id: "flower", icon: Flower, label: "Flower" },
  { id: "clover", icon: Clover, label: "Clover" },
  { id: "cat", icon: Cat, label: "Cat" },
  { id: "dog", icon: Dog, label: "Dog" },
  { id: "bird", icon: Bird, label: "Bird" },
  { id: "fish", icon: Fish, label: "Fish" },
  { id: "leaf", icon: Leaf, label: "Leaf" },
  { id: "snowflake", icon: Snowflake, label: "Snowflake" },
  { id: "rainbow", icon: Rainbow, label: "Rainbow" },
  { id: "orbit", icon: Orbit, label: "Orbit" },
  { id: "atom", icon: Atom, label: "Atom" },
  { id: "flask", icon: FlaskConical, label: "Flask" },
  { id: "medal", icon: Medal, label: "Medal" },
  { id: "party-popper", icon: PartyPopper, label: "Party Popper" },
  { id: "coffee", icon: Coffee, label: "Coffee" },
  { id: "pizza", icon: Pizza, label: "Pizza" },
  { id: "cross", icon: Cross, label: "Cross" },
  { id: "swords", icon: Swords, label: "Swords" },
  { id: "tree-pine", icon: TreePine, label: "Pine Tree" },
  { id: "mountain", icon: Mountain, label: "Mountain" },
  { id: "eye-off", icon: EyeOff, label: "Hidden Eye" },
  { id: "sparkle", icon: Sparkle, label: "Sparkle" },
  { id: "grid", icon: Grid, label: "Grid" },
  { id: "plus", icon: Plus, label: "Plus" },
  { id: "minus", icon: Minus, label: "Minus" },
  { id: "move", icon: Move, label: "Move" },
  { id: "droplet", icon: Droplet, label: "Droplet" },
  { id: "octagon", icon: Octagon, label: "Octagon" },
  { id: "pause", icon: Pause, label: "Pause" },
  { id: "percent", icon: Percent, label: "Percent" },
  { id: "pie-chart", icon: PieChart, label: "Pie Chart" },
  { id: "play", icon: Play, label: "Play" },
  { id: "plus-circle", icon: PlusCircle, label: "Add Circle" },
  { id: "refresh", icon: RefreshCw, label: "Refresh" },
  { id: "repeat", icon: Repeat, label: "Repeat" },
  { id: "rotate-cw", icon: RotateCw, label: "Rotate Clockwise" },
  { id: "rotate-ccw", icon: RotateCcw, label: "Rotate Counterclockwise" },
  { id: "sunrise", icon: Sunrise, label: "Sunrise" },
  { id: "sunset", icon: Sunset, label: "Sunset" },
  { id: "tablet", icon: Tablet, label: "Tablet" },
  { id: "thumbs-down", icon: ThumbsDown, label: "Thumbs Down" },
  { id: "toggle-left", icon: ToggleLeft, label: "Toggle Left" },
  { id: "toggle-right", icon: ToggleRight, label: "Toggle Right" },
  { id: "unlock", icon: Unlock, label: "Unlock" },
  { id: "user-check", icon: UserCheck, label: "Verified User" },
  { id: "user-minus", icon: UserMinus, label: "Remove User" },
  { id: "user-plus", icon: UserPlus, label: "Add User" },
  { id: "user-x", icon: UserX, label: "Blocked User" },
  { id: "volume", icon: Volume, label: "Volume" },
  { id: "volume-low", icon: Volume1, label: "Low Volume" },
  { id: "volume-high", icon: Volume2, label: "High Volume" },
  { id: "volume-off", icon: VolumeX, label: "Muted Volume" },
  { id: "minimize", icon: Minimize, label: "Minimize" },
  { id: "maximize", icon: Maximize, label: "Maximize" },
  { id: "minimize-2", icon: Minimize2, label: "Compact" },
  { id: "maximize-2", icon: Maximize2, label: "Expand" },
  { id: "zoom-in", icon: ZoomIn, label: "Zoom In" },
  { id: "zoom-out", icon: ZoomOut, label: "Zoom Out" }
];

const ITEMS_PER_PAGE = 30;
const BUILDER_STORAGE_KEY = "discapp-role-icon-maker-settings-v1";

const SHAPES = [
  { id: "circle", label: "Circle", rx: "50%" },
  { id: "badge", label: "Scallop Badge", path: "M 50 0 C 60 10, 70 0, 80 10 C 90 20, 100 30, 90 40 C 100 50, 100 60, 90 70 C 100 80, 90 90, 80 90 C 70 100, 60 90, 50 100 C 40 90, 30 100, 20 90 C 10 90, 0 80, 10 70 C 0 60, 0 50, 10 40 C 0 30, 10 20, 20 10 C 30 0, 40 10, 50 0 Z" },
  { id: "shield", label: "Shield Base", path: "M 50 0 L 100 15 V 50 C 100 80, 50 100, 50 100 C 50 100, 0 80, 0 50 V 15 Z" },
  { id: "hexagon", label: "Hexagon", path: "M 50 0 L 93 25 V 75 L 50 100 L 7 75 V 25 Z" },
  { id: "octagon", label: "Octagon", path: "M 30 0 L 70 0 L 100 30 L 100 70 L 70 100 L 30 100 L 0 70 L 0 30 Z" },
  { id: "diamond", label: "Diamond", path: "M 50 0 L 100 50 L 50 100 L 0 50 Z" },
  { id: "star-shape", label: "Star Base", path: "M 50 0 L 63 35 L 100 38 L 72 63 L 80 100 L 50 80 L 20 100 L 28 63 L 0 38 L 37 35 Z" },
  { id: "triangle", label: "Triangle", path: "M 50 0 L 100 100 L 0 100 Z" },
  { id: "pentagon", label: "Pentagon", path: "M 50 0 L 100 38 L 81 100 L 19 100 L 0 38 Z" },
  { id: "rounded-diamond", label: "Gem Frame", path: "M 50 2 Q 57 2 62 8 L 92 38 Q 98 44 98 50 Q 98 56 92 62 L 62 92 Q 56 98 50 98 Q 44 98 38 92 L 8 62 Q 2 56 2 50 Q 2 44 8 38 L 38 8 Q 44 2 50 2 Z" },
  { id: "shield-wide", label: "Knight Shield", path: "M 50 2 L 94 16 V 48 C 94 70 76 88 50 98 C 24 88 6 70 6 48 V 16 Z" },
  { id: "burst", label: "Sunburst", path: "M 50 0 L 58 12 L 72 4 L 76 19 L 93 17 L 91 33 L 100 42 L 89 51 L 98 65 L 82 70 L 84 87 L 67 85 L 58 100 L 48 88 L 34 97 L 29 81 L 12 84 L 14 67 L 0 58 L 12 48 L 3 34 L 19 29 L 16 13 L 33 15 L 42 0 Z" },
  { id: "ribbon", label: "Ribbon Badge", path: "M 50 0 L 95 18 V 55 C 95 78 73 91 50 100 C 27 91 5 78 5 55 V 18 Z" },
  { id: "cloud-shape", label: "Cloud Frame", path: "M 25 80 C 10 80, 0 70, 0 55 C 0 43, 8 33, 20 31 C 25 13, 40 0, 60 0 C 78 0, 92 12, 97 28 C 100 28, 100 29, 100 30 C 100 45, 90 80, 75 80 Z" },
  { id: "heart-shape", label: "Heart Base", path: "M 50 90 C 50 90, 0 55, 0 30 C 0 12, 15 0, 30 0 C 40 0, 47 6, 50 12 C 53 6, 60 0, 70 0 C 85 0, 100 12, 100 30 C 100 55, 50 90, 50 90 Z" },
  { id: "rounded-square", label: "Soft Square", rx: "24" },
  { id: "square", label: "Sharp Square", rx: "0" },
];

export default function RoleIconBuilder() {
  const [activeTab, setActiveTab] = useState<"icon" | "shape" | "style" | "effects">("icon");
  const [search, setSearch] = useState("");
  const [selectedIcon, setSelectedIcon] = useState("crown");
  const [customText, setCustomText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  
  const [selectedShape, setSelectedShape] = useState("circle");
  const [shapeScale, setShapeScale] = useState(100);
  const [shapeRotation, setShapeRotation] = useState(0);
  const [shapeCornerRadius, setShapeCornerRadius] = useState(24);

  const [bgColor, setBgColor] = useState("#5865F2");
  const [useGradientBg, setUseGradientBg] = useState(false);
  const [bgGradientEnd, setBgGradientEnd] = useState("#eb459e");
  const [bgGradientAngle, setBgGradientAngle] = useState(135);
  
  const [iconColor, setIconColor] = useState("#FFFFFF");
  const [useGradientIcon, setUseGradientIcon] = useState(false);
  const [iconGradientEnd, setIconGradientEnd] = useState("#57f287");
  const [iconGradientAngle, setIconGradientAngle] = useState(45);
  
  const [iconSize, setIconSize] = useState(60);
  const [iconStrokeWidth, setIconStrokeWidth] = useState(2.2);
  const [iconOpacity, setIconOpacity] = useState(100);
  const [fontFamily, setFontFamily] = useState("sans-serif");
  const [fontWeight, setFontWeight] = useState("bold");

  const [iconOffsetX, setIconOffsetX] = useState(0);
  const [iconOffsetY, setIconOffsetY] = useState(0);
  const [iconRotation, setIconRotation] = useState(0);
  
  const [enableBorder, setEnableBorder] = useState(false);
  const [borderColor, setBorderColor] = useState("#FFFFFF");
  const [borderWidth, setBorderWidth] = useState(4);
  const [borderStyle, setBorderStyle] = useState("solid");
  const [enableInnerBorder, setEnableInnerBorder] = useState(false);
  const [innerBorderColor, setInnerBorderColor] = useState("#111214");
  const [innerBorderWidth, setInnerBorderWidth] = useState(1.5);
  
  const [enableGlow, setEnableGlow] = useState(false);
  const [glowColor, setGlowColor] = useState("#5865F2");
  const [glowBlur, setGlowBlur] = useState(8);

  const [enableShadow, setEnableShadow] = useState(false);
  const [shadowColor, setShadowColor] = useState("#000000");
  const [shadowOffsetX, setShadowOffsetX] = useState(2);
  const [shadowOffsetY, setShadowOffsetY] = useState(4);
  const [shadowBlur, setShadowBlur] = useState(4);

  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [backgroundImage, setBackgroundImage] = useState<string | null>(null);
  const [shapeImageError, setShapeImageError] = useState("");
  const [settingsLoaded, setSettingsLoaded] = useState(false);
  const [saveStatus, setSaveStatus] = useState("Restoring saved design...");

  const svgRef = useRef<SVGSVGElement>(null);

  const persistedSettings = JSON.stringify({
    selectedIcon, customText, selectedShape, shapeScale, shapeRotation, shapeCornerRadius,
    bgColor, useGradientBg, bgGradientEnd, bgGradientAngle, iconColor, useGradientIcon,
    iconGradientEnd, iconGradientAngle, iconSize, iconStrokeWidth, iconOpacity, fontFamily,
    fontWeight, iconOffsetX, iconOffsetY, iconRotation, enableBorder, borderColor,
    borderWidth, borderStyle, enableInnerBorder, innerBorderColor, innerBorderWidth,
    enableGlow, glowColor, glowBlur, enableShadow, shadowColor, shadowOffsetX,
    shadowOffsetY, shadowBlur, uploadedImage, backgroundImage,
  });

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(BUILDER_STORAGE_KEY);
      if (stored) {
        const saved = JSON.parse(stored) as Record<string, unknown>;
        const getString = (key: string, fallback: string) => typeof saved[key] === "string" ? saved[key] as string : fallback;
        const getNumber = (key: string, fallback: number, min: number, max: number) => {
          const value = saved[key];
          return typeof value === "number" && Number.isFinite(value) ? Math.min(max, Math.max(min, value)) : fallback;
        };
        const getBoolean = (key: string, fallback: boolean) => typeof saved[key] === "boolean" ? saved[key] as boolean : fallback;
        const getColor = (key: string, fallback: string) => {
          const value = getString(key, fallback);
          return /^#[\da-f]{6}$/i.test(value) ? value : fallback;
        };

        const storedIcon = getString("selectedIcon", selectedIcon);
        const storedShape = getString("selectedShape", selectedShape);
        if (ALL_ICONS.some((item) => item.id === storedIcon)) setSelectedIcon(storedIcon);
        if (SHAPES.some((shape) => shape.id === storedShape)) setSelectedShape(storedShape);
        setCustomText(getString("customText", "").slice(0, 3));
        setShapeScale(getNumber("shapeScale", 100, 50, 100));
        setShapeRotation(getNumber("shapeRotation", 0, 0, 360));
        setShapeCornerRadius(getNumber("shapeCornerRadius", 24, 0, 50));
        setBgColor(getColor("bgColor", "#5865F2"));
        setUseGradientBg(getBoolean("useGradientBg", false));
        setBgGradientEnd(getColor("bgGradientEnd", "#eb459e"));
        setBgGradientAngle(getNumber("bgGradientAngle", 135, 0, 360));
        setIconColor(getColor("iconColor", "#FFFFFF"));
        setUseGradientIcon(getBoolean("useGradientIcon", false));
        setIconGradientEnd(getColor("iconGradientEnd", "#57f287"));
        setIconGradientAngle(getNumber("iconGradientAngle", 45, 0, 360));
        setIconSize(getNumber("iconSize", 60, 20, 90));
        setIconStrokeWidth(getNumber("iconStrokeWidth", 2.2, 0.5, 4));
        setIconOpacity(getNumber("iconOpacity", 100, 10, 100));
        setFontFamily(getString("fontFamily", "sans-serif"));
        setFontWeight(getString("fontWeight", "bold"));
        setIconOffsetX(getNumber("iconOffsetX", 0, -20, 20));
        setIconOffsetY(getNumber("iconOffsetY", 0, -20, 20));
        setIconRotation(getNumber("iconRotation", 0, 0, 360));
        setEnableBorder(getBoolean("enableBorder", false));
        setBorderColor(getColor("borderColor", "#FFFFFF"));
        setBorderWidth(getNumber("borderWidth", 4, 1, 10));
        setBorderStyle(["solid", "dashed", "dotted"].includes(getString("borderStyle", "solid")) ? getString("borderStyle", "solid") : "solid");
        setEnableInnerBorder(getBoolean("enableInnerBorder", false));
        setInnerBorderColor(getColor("innerBorderColor", "#111214"));
        setInnerBorderWidth(getNumber("innerBorderWidth", 1.5, 0.5, 4));
        setEnableGlow(getBoolean("enableGlow", false));
        setGlowColor(getColor("glowColor", "#5865F2"));
        setGlowBlur(getNumber("glowBlur", 8, 2, 20));
        setEnableShadow(getBoolean("enableShadow", false));
        setShadowColor(getColor("shadowColor", "#000000"));
        setShadowOffsetX(getNumber("shadowOffsetX", 2, -10, 10));
        setShadowOffsetY(getNumber("shadowOffsetY", 4, -10, 10));
        setShadowBlur(getNumber("shadowBlur", 4, 0, 15));
        const storedImage = saved.uploadedImage;
        setUploadedImage(typeof storedImage === "string" && storedImage.startsWith("data:image/") ? storedImage : null);
        const storedBackgroundImage = saved.backgroundImage;
        setBackgroundImage(typeof storedBackgroundImage === "string" && storedBackgroundImage.startsWith("data:image/") ? storedBackgroundImage : null);
        setSaveStatus("Saved design restored");
      }
    } catch {
      setSaveStatus("Could not restore saved design");
    } finally {
      setSettingsLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (!settingsLoaded) return;
    try {
      window.localStorage.setItem(BUILDER_STORAGE_KEY, persistedSettings);
      setSaveStatus("Saved on this device");
    } catch {
      setSaveStatus("Local save unavailable. Browser storage may be full.");
    }
  }, [settingsLoaded, persistedSettings]);

  const filteredIcons = ALL_ICONS.filter((item) => 
    item.label.toLowerCase().includes(search.toLowerCase()) ||
    item.id.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredIcons.length / ITEMS_PER_PAGE) || 1;
  const currentIcons = filteredIcons.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const SelectedIconComponent = ALL_ICONS.find((i) => i.id === selectedIcon)?.icon || Crown;
  const currentShapeObj = SHAPES.find((s) => s.id === selectedShape);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setUploadedImage(event.target?.result as string);
        setCustomText("");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleShapeImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    setShapeImageError("");
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setShapeImageError("Choose a supported image file.");
      return;
    }
    if (file.size > 2_000_000) {
      setShapeImageError("Choose an image smaller than 2 MB for local saving.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") setBackgroundImage(reader.result);
    };
    reader.onerror = () => setShapeImageError("The image could not be read.");
    reader.readAsDataURL(file);
  };

  const handleDownloadPNG = () => {
    if (!svgRef.current) return;
    const svgData = new XMLSerializer().serializeToString(svgRef.current);
    const svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
    const URL = window.URL || window.webkitURL || window;
    const blobURL = URL.createObjectURL(svgBlob);

    const image = new Image();
    image.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = 128;
      canvas.height = 128;
      const context = canvas.getContext("2d");
      if (context) {
        context.imageSmoothingEnabled = true;
        context.imageSmoothingQuality = "high";
        context.drawImage(image, 0, 0, 128, 128);
        const png = canvas.toDataURL("image/png");
        const downloadLink = document.createElement("a");
        downloadLink.href = png;
        downloadLink.download = `discapp-org-${selectedIcon}.png`;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
      }
    };
    image.src = blobURL;
  };

  const getFilterStyle = () => {
    const filters = [];
    if (enableGlow) filters.push(`drop-shadow(0 0 ${glowBlur}px ${glowColor})`);
    if (enableShadow) filters.push(`drop-shadow(${shadowOffsetX}px ${shadowOffsetY}px ${shadowBlur}px ${shadowColor})`);
    return filters.length > 0 ? filters.join(" ") : "none";
  };

  const getDashArray = () => {
    if (borderStyle === "dashed") return "6,6";
    if (borderStyle === "dotted") return "2,4";
    return "none";
  };

  return (
    <div className="role-icon-builder" style={{ minHeight: "100vh", backgroundColor: "#111214", color: "#dbdee1", padding: "1.5rem", display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div style={{ width: "100%", maxWidth: "72rem", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
        <div>
          <h1 style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#ffffff", letterSpacing: "0.025em" }}>Role Icon Builder</h1>
          <p style={{ fontSize: "0.875rem", color: "#949ba4", marginTop: "0.25rem" }}>
            Design custom Discord role icons with full vector gradient support, customizable shapes, and high-resolution PNG export.
          </p>
          <p aria-live="polite" style={{ display: "flex", alignItems: "center", gap: "0.35rem", fontSize: "0.7rem", color: saveStatus.startsWith("Local save unavailable") || saveStatus.startsWith("Could not") ? "#f0a2ad" : "#949ba4", marginTop: "0.4rem" }}>
            {saveStatus.startsWith("Local save unavailable") || saveStatus.startsWith("Could not") ? <X size={13} aria-hidden="true" /> : saveStatus.startsWith("Saved") ? <SaveCheck size={14} aria-hidden="true" /> : <Save size={13} aria-hidden="true" />}
            {saveStatus}
          </p>
        </div>

        <div className="role-icon-builder-grid">
          <div className="role-icon-editor" style={{ backgroundColor: "#1e2024", border: "1px solid #2b2d31", borderRadius: "0.5rem", display: "flex", flexDirection: "column", overflow: "hidden" }}>
            <div className="role-icon-tabs" style={{ display: "flex", borderBottom: "1px solid #2b2d31", backgroundColor: "#111214" }}>
              {(["icon", "shape", "style", "effects"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    padding: "0.75rem 1.25rem",
                    fontSize: "0.875rem",
                    fontWeight: 500,
                    textTransform: "capitalize",
                    borderBottom: activeTab === tab ? "2px solid #57f287" : "2px solid transparent",
                    color: activeTab === tab ? "#ffffff" : "#949ba4",
                    backgroundColor: activeTab === tab ? "#1e2024" : "transparent",
                    cursor: "pointer"
                  }}
                >
                  {tab === "icon" && <Search size={16} />}
                  {tab === "shape" && <Layers size={16} />}
                  {tab === "style" && <Palette size={16} />}
                  {tab === "effects" && <Sparkles size={16} />}
                  {tab}
                </button>
              ))}
            </div>

            <div style={{ padding: "1.25rem", flex: 1, display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              {activeTab === "icon" && (
                <>
                  <div style={{ display: "flex", gap: "0.75rem" }}>
                    <div style={{ position: "relative", flex: 1 }}>
                      <Search size={16} style={{ position: "absolute", left: "0.75rem", top: "0.625rem", color: "#949ba4" }} />
                      <input
                        type="text"
                        placeholder="Search icons..."
                        value={search}
                        onChange={(e) => {
                          setSearch(e.target.value);
                          setCurrentPage(1);
                        }}
                        style={{
                          width: "100%",
                          backgroundColor: "#111214",
                          border: "1px solid #2b2d31",
                          borderRadius: "0.375rem",
                          paddingLeft: "2.25rem",
                          paddingRight: "0.75rem",
                          paddingTop: "0.375rem",
                          paddingBottom: "0.375rem",
                          fontSize: "0.875rem",
                          color: "#ffffff",
                          outline: "none"
                        }}
                      />
                    </div>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: "0.75rem" }}>
                    <div>
                      <label style={{ fontSize: "0.75rem", fontWeight: 600, color: "#b5bac1", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.375rem", display: "flex", alignItems: "center", gap: "0.375rem" }}>
                        <Type size={14} /> Text
                      </label>
                      <input
                        type="text"
                        maxLength={3}
                        placeholder="e.g. VIP"
                        value={customText}
                        onChange={(e) => {
                          setCustomText(e.target.value);
                          setUploadedImage(null);
                        }}
                        style={{
                          width: "100%",
                          backgroundColor: "#111214",
                          border: "1px solid #2b2d31",
                          borderRadius: "0.375rem",
                          padding: "0.375rem 0.75rem",
                          fontSize: "0.875rem",
                          color: "#ffffff",
                          outline: "none"
                        }}
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: "0.75rem", fontWeight: 600, color: "#b5bac1", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.375rem", display: "flex", alignItems: "center", gap: "0.375rem" }}>
                        <ImageIcon size={14} /> Upload Icon
                      </label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        style={{
                          width: "100%",
                          backgroundColor: "#111214",
                          border: "1px solid #2b2d31",
                          borderRadius: "0.375rem",
                          padding: "0.25rem 0.5rem",
                          fontSize: "0.75rem",
                          color: "#ffffff"
                        }}
                      />
                    </div>
                  </div>

                  <div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
                      <label style={{ fontSize: "0.75rem", fontWeight: 600, color: "#b5bac1", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                        Icons ({filteredIcons.length})
                      </label>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.75rem", color: "#949ba4" }}>
                        <button
                          disabled={currentPage === 1}
                          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                          style={{
                            backgroundColor: "#2b2d31",
                            border: "none",
                            color: "#ffffff",
                            padding: "0.25rem",
                            borderRadius: "0.25rem",
                            cursor: currentPage === 1 ? "not-allowed" : "pointer",
                            opacity: currentPage === 1 ? 0.5 : 1
                          }}
                        >
                          <ChevronLeft size={16} />
                        </button>
                        <span>Page {currentPage} of {totalPages}</span>
                        <button
                          disabled={currentPage === totalPages}
                          onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                          style={{
                            backgroundColor: "#2b2d31",
                            border: "none",
                            color: "#ffffff",
                            padding: "0.25rem",
                            borderRadius: "0.25rem",
                            cursor: currentPage === totalPages ? "not-allowed" : "pointer",
                            opacity: currentPage === totalPages ? 0.5 : 1
                          }}
                        >
                          <ChevronRight size={16} />
                        </button>
                      </div>
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "repeat(6, minmax(0, 1fr))", gridAutoRows: "3.25rem", alignContent: "start", gap: "0.5rem", minHeight: "14rem" }}>
                      {currentIcons.map((item) => {
                        const IconComponent = item.icon;
                        const isSelected = selectedIcon === item.id && !customText && !uploadedImage;
                        return (
                          <button
                            key={item.id}
                            title={item.label}
                            onClick={() => {
                              setSelectedIcon(item.id);
                              setCustomText("");
                              setUploadedImage(null);
                            }}
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "center",
                              justifyContent: "center",
                              padding: "0.75rem",
                              borderRadius: "0.375rem",
                              border: isSelected ? "1px solid #5865F2" : "1px solid transparent",
                              backgroundColor: isSelected ? "rgba(88, 101, 242, 0.2)" : "#111214",
                              color: isSelected ? "#ffffff" : "#b5bac1",
                              cursor: "pointer"
                            }}
                          >
                            <IconComponent size={22} />
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </>
              )}

              {activeTab === "shape" && (
                <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                  <details open>
                    <summary style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem", color: "#b5bac1", fontSize: "0.75rem", fontWeight: 600, textTransform: "uppercase", cursor: "pointer", listStyle: "none" }}>
                      Shapes <ChevronDown size={15} />
                    </summary>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(5.5rem, 1fr))", gap: "0.5rem" }}>
                      {SHAPES.map((s) => (
                        <button
                          key={s.id}
                          onClick={() => setSelectedShape(s.id)}
                          title={s.label}
                          aria-label={s.label}
                          style={{
                            minHeight: "5.25rem",
                            padding: "0.5rem",
                            borderRadius: "0.375rem",
                            border: selectedShape === s.id ? "1px solid #57f287" : "1px solid #2b2d31",
                            backgroundColor: selectedShape === s.id ? "rgba(87, 242, 135, 0.1)" : "#111214",
                            color: selectedShape === s.id ? "#ffffff" : "#b5bac1",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "0.65rem",
                            fontWeight: 500,
                            cursor: "pointer",
                            gap: "0.35rem"
                          }}
                        >
                          <svg viewBox="0 0 100 100" width="32" height="32" aria-hidden="true">
                            {s.path ? <path d={s.path} fill={selectedShape === s.id ? bgColor : "#5865f2"} stroke={selectedShape === s.id && enableBorder ? borderColor : "#949ba4"} strokeWidth="4" /> : <rect x="4" y="4" width="92" height="92" rx={s.id === "rounded-square" ? shapeCornerRadius : s.rx || "0"} fill={selectedShape === s.id ? bgColor : "#5865f2"} stroke={selectedShape === s.id && enableBorder ? borderColor : "#949ba4"} strokeWidth="4" />}
                          </svg>
                        </button>
                      ))}
                    </div>
                  </details>

                  <details open>
                    <summary style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem", color: "#b5bac1", fontSize: "0.75rem", fontWeight: 600, textTransform: "uppercase", cursor: "pointer", listStyle: "none" }}>
                      Adjustments <ChevronDown size={15} />
                    </summary>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: "1rem" }}>
                    <div>
                      <label style={{ fontSize: "0.75rem", fontWeight: 600, color: "#b5bac1", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.5rem", display: "block" }}>
                        Shape Scale ({shapeScale}%)
                      </label>
                      <input
                        type="range"
                        min="50"
                        max="100"
                        value={shapeScale}
                        onChange={(e) => setShapeScale(Number(e.target.value))}
                        style={{ width: "100%", accentColor: "#57f287" }}
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: "0.75rem", fontWeight: 600, color: "#b5bac1", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.5rem", display: "block" }}>
                        Shape Rotation ({shapeRotation}°)
                      </label>
                      <input
                        type="range"
                        min="0"
                        max="360"
                        value={shapeRotation}
                        onChange={(e) => setShapeRotation(Number(e.target.value))}
                        style={{ width: "100%", accentColor: "#57f287" }}
                      />
                    </div>
                  </div>

                    {currentShapeObj?.id === "rounded-square" && (
                      <div>
                      <label style={{ fontSize: "0.75rem", fontWeight: 600, color: "#b5bac1", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.5rem", display: "block" }}>
                        Corner Roundness ({shapeCornerRadius}px)
                      </label>
                      <input
                        type="range"
                        min="0"
                        max="50"
                        value={shapeCornerRadius}
                        onChange={(e) => setShapeCornerRadius(Number(e.target.value))}
                        style={{ width: "100%", accentColor: "#57f287" }}
                      />
                      </div>
                    )}
                  </details>

                  <div style={{ borderTop: "1px solid #2b2d31", paddingTop: "0.75rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                    <label htmlFor="shape-image-upload" style={{ fontSize: "0.75rem", fontWeight: 600, color: "#b5bac1", textTransform: "uppercase" }}>
                      Shape Image
                    </label>
                    <input
                      id="shape-image-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleShapeImageUpload}
                      style={{ width: "100%", backgroundColor: "#111214", border: "1px solid #2b2d31", borderRadius: "0.375rem", padding: "0.375rem", color: "#ffffff", fontSize: "0.75rem" }}
                    />
                    {backgroundImage && (
                      <button type="button" onClick={() => { setBackgroundImage(null); setShapeImageError(""); }} style={{ alignSelf: "flex-start", border: "1px solid #2b2d31", borderRadius: "0.25rem", padding: "0.4rem 0.6rem", color: "#dbdee1", backgroundColor: "#111214", fontSize: "0.7rem", cursor: "pointer" }}>
                        Remove shape image
                      </button>
                    )}
                    {backgroundImage && <span style={{ color: "#949ba4", fontSize: "0.7rem" }}>Background colors and gradients are disabled while the image is used.</span>}
                    {shapeImageError && <span role="alert" style={{ color: "#f0a2ad", fontSize: "0.7rem" }}>{shapeImageError}</span>}
                  </div>
                </div>
              )}

              {activeTab === "style" && (
                <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                  <details open>
                    <summary style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem", color: "#b5bac1", fontSize: "0.75rem", fontWeight: 600, textTransform: "uppercase", cursor: "pointer", listStyle: "none" }}>
                      Colors and Gradients <ChevronDown size={15} />
                    </summary>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: "1rem" }}>
                    <div>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
                        <label style={{ fontSize: "0.75rem", fontWeight: 600, color: "#b5bac1", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                          Background
                        </label>
                        <button 
                          disabled={Boolean(backgroundImage)}
                          onClick={() => setUseGradientBg(!useGradientBg)} 
                          style={{ fontSize: "0.65rem", color: "#57f287", background: "none", border: "none", cursor: backgroundImage ? "not-allowed" : "pointer", opacity: backgroundImage ? 0.5 : 1 }}
                        >
                          {useGradientBg ? "Use Solid Color" : "Enable Gradient"}
                        </button>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                        <input
                          type="color"
                          disabled={Boolean(backgroundImage)}
                          value={bgColor}
                          onChange={(e) => setBgColor(e.target.value)}
                          style={{ width: "2.25rem", height: "2.25rem", backgroundColor: "transparent", borderRadius: "0.25rem", cursor: "pointer", border: "none" }}
                        />
                        {useGradientBg && (
                          <input
                            type="color"
                            disabled={Boolean(backgroundImage)}
                            value={bgGradientEnd}
                            onChange={(e) => setBgGradientEnd(e.target.value)}
                            style={{ width: "2.25rem", height: "2.25rem", backgroundColor: "transparent", borderRadius: "0.25rem", cursor: "pointer", border: "none" }}
                          />
                        )}
                        <input
                          type="text"
                          disabled={Boolean(backgroundImage)}
                          value={bgColor}
                          onChange={(e) => setBgColor(e.target.value)}
                          style={{ width: "100%", backgroundColor: "#111214", border: "1px solid #2b2d31", borderRadius: "0.25rem", padding: "0.375rem 0.75rem", fontSize: "0.875rem", color: "#ffffff" }}
                        />
                      </div>
                      {useGradientBg && (
                        <div style={{ marginTop: "0.5rem" }}>
                          <label style={{ fontSize: "0.65rem", color: "#b5bac1" }}>Gradient Angle ({bgGradientAngle}°)</label>
                          <input
                            type="range"
                            disabled={Boolean(backgroundImage)}
                            min="0"
                            max="360"
                            value={bgGradientAngle}
                            onChange={(e) => setBgGradientAngle(Number(e.target.value))}
                            style={{ width: "100%", accentColor: "#57f287" }}
                          />
                        </div>
                      )}
                    </div>

                    <div>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
                        <label style={{ fontSize: "0.75rem", fontWeight: 600, color: "#b5bac1", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                          Icon / Text Color
                        </label>
                        <button 
                          onClick={() => setUseGradientIcon(!useGradientIcon)} 
                          style={{ fontSize: "0.65rem", color: "#57f287", background: "none", border: "none", cursor: "pointer" }}
                        >
                          {useGradientIcon ? "Use Solid Color" : "Enable Gradient"}
                        </button>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                        <input
                          type="color"
                          value={iconColor}
                          onChange={(e) => setIconColor(e.target.value)}
                          style={{ width: "2.25rem", height: "2.25rem", backgroundColor: "transparent", borderRadius: "0.25rem", cursor: "pointer", border: "none" }}
                        />
                        {useGradientIcon && (
                          <input
                            type="color"
                            value={iconGradientEnd}
                            onChange={(e) => setIconGradientEnd(e.target.value)}
                            style={{ width: "2.25rem", height: "2.25rem", backgroundColor: "transparent", borderRadius: "0.25rem", cursor: "pointer", border: "none" }}
                          />
                        )}
                        <input
                          type="text"
                          value={iconColor}
                          onChange={(e) => setIconColor(e.target.value)}
                          style={{ width: "100%", backgroundColor: "#111214", border: "1px solid #2b2d31", borderRadius: "0.25rem", padding: "0.375rem 0.75rem", fontSize: "0.875rem", color: "#ffffff" }}
                        />
                      </div>
                      {useGradientIcon && (
                        <div style={{ marginTop: "0.5rem" }}>
                          <label style={{ fontSize: "0.65rem", color: "#b5bac1" }}>Gradient Angle ({iconGradientAngle}°)</label>
                          <input
                            type="range"
                            min="0"
                            max="360"
                            value={iconGradientAngle}
                            onChange={(e) => setIconGradientAngle(Number(e.target.value))}
                            style={{ width: "100%", accentColor: "#57f287" }}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                  </details>

                  <details open>
                    <summary style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem", color: "#b5bac1", fontSize: "0.75rem", fontWeight: 600, textTransform: "uppercase", cursor: "pointer", listStyle: "none" }}>
                      Icon and Text <ChevronDown size={15} />
                    </summary>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: "0.75rem" }}>
                    <div>
                      <label style={{ fontSize: "0.75rem", fontWeight: 600, color: "#b5bac1", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.5rem", display: "block" }}>
                        Icon Scale ({iconSize}%)
                      </label>
                      <input
                        type="range"
                        min="20"
                        max="90"
                        value={iconSize}
                        onChange={(e) => setIconSize(Number(e.target.value))}
                        style={{ width: "100%", accentColor: "#57f287" }}
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: "0.75rem", fontWeight: 600, color: "#b5bac1", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.5rem", display: "block" }}>
                        Stroke Width ({iconStrokeWidth})
                      </label>
                      <input
                        type="range"
                        min="0.5"
                        max="4"
                        step="0.1"
                        value={iconStrokeWidth}
                        onChange={(e) => setIconStrokeWidth(Number(e.target.value))}
                        style={{ width: "100%", accentColor: "#57f287" }}
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: "0.75rem", fontWeight: 600, color: "#b5bac1", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.5rem", display: "block" }}>
                        Opacity ({iconOpacity}%)
                      </label>
                      <input
                        type="range"
                        min="10"
                        max="100"
                        value={iconOpacity}
                        onChange={(e) => setIconOpacity(Number(e.target.value))}
                        style={{ width: "100%", accentColor: "#57f287" }}
                      />
                    </div>
                  </div>

                  {customText && (
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: "1rem" }}>
                      <div>
                        <label style={{ fontSize: "0.75rem", fontWeight: 600, color: "#b5bac1", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.5rem", display: "block" }}>
                          Font Family
                        </label>
                        <select
                          value={fontFamily}
                          onChange={(e) => setFontFamily(e.target.value)}
                          style={{ width: "100%", backgroundColor: "#111214", border: "1px solid #2b2d31", borderRadius: "0.25rem", padding: "0.375rem", color: "#ffffff" }}
                        >
                          <option value="sans-serif">Sans-Serif</option>
                          <option value="serif">Serif</option>
                          <option value="monospace">Monospace</option>
                          <option value="system-ui">System UI</option>
                          <option value="Georgia, serif">Georgia</option>
                          <option value="'Courier New', monospace">Courier New</option>
                          <option value="Impact, sans-serif">Impact</option>
                          <option value="'Comic Sans MS', cursive">Comic Sans</option>
                          <option value="cursive">Cursive</option>
                        </select>
                      </div>
                      <div>
                        <label style={{ fontSize: "0.75rem", fontWeight: 600, color: "#b5bac1", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.5rem", display: "block" }}>
                          Font Weight
                        </label>
                        <select
                          value={fontWeight}
                          onChange={(e) => setFontWeight(e.target.value)}
                          style={{ width: "100%", backgroundColor: "#111214", border: "1px solid #2b2d31", borderRadius: "0.25rem", padding: "0.375rem", color: "#ffffff" }}
                        >
                          <option value="normal">Normal</option>
                          <option value="bold">Bold</option>
                          <option value="900">Black</option>
                        </select>
                      </div>
                    </div>
                  )}
                  </details>
                </div>
              )}

              {activeTab === "effects" && (
                <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: "0.75rem" }}>
                    <div>
                      <label style={{ fontSize: "0.75rem", fontWeight: 600, color: "#b5bac1", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.5rem", display: "block" }}>
                        Offset X ({iconOffsetX}px)
                      </label>
                      <input
                        type="range"
                        min="-20"
                        max="20"
                        value={iconOffsetX}
                        onChange={(e) => setIconOffsetX(Number(e.target.value))}
                        style={{ width: "100%", accentColor: "#57f287" }}
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: "0.75rem", fontWeight: 600, color: "#b5bac1", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.5rem", display: "block" }}>
                        Offset Y ({iconOffsetY}px)
                      </label>
                      <input
                        type="range"
                        min="-20"
                        max="20"
                        value={iconOffsetY}
                        onChange={(e) => setIconOffsetY(Number(e.target.value))}
                        style={{ width: "100%", accentColor: "#57f287" }}
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: "0.75rem", fontWeight: 600, color: "#b5bac1", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.5rem", display: "block" }}>
                        Rotation ({iconRotation}°)
                      </label>
                      <input
                        type="range"
                        min="0"
                        max="360"
                        value={iconRotation}
                        onChange={(e) => setIconRotation(Number(e.target.value))}
                        style={{ width: "100%", accentColor: "#57f287" }}
                      />
                    </div>
                  </div>

                  <div style={{ borderTop: "1px solid #2b2d31", paddingTop: "0.75rem" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
                      <input
                        type="checkbox"
                        id="border"
                        checked={enableBorder}
                        onChange={(e) => setEnableBorder(e.target.checked)}
                      />
                      <label htmlFor="border" style={{ fontSize: "0.75rem", fontWeight: 600, color: "#b5bac1", textTransform: "uppercase" }}>
                        Outer Border
                      </label>
                    </div>
                    {enableBorder && (
                      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: "0.5rem", alignItems: "center" }}>
                        <input
                          type="color"
                          value={borderColor}
                          onChange={(e) => setBorderColor(e.target.value)}
                          style={{ width: "2rem", height: "2rem", backgroundColor: "transparent", border: "none", cursor: "pointer" }}
                        />
                        <input
                          type="range"
                          min="1"
                          max="10"
                          value={borderWidth}
                          onChange={(e) => setBorderWidth(Number(e.target.value))}
                          style={{ accentColor: "#57f287" }}
                        />
                        <select
                          value={borderStyle}
                          onChange={(e) => setBorderStyle(e.target.value)}
                          style={{ backgroundColor: "#111214", border: "1px solid #2b2d31", borderRadius: "0.25rem", color: "#ffffff", padding: "0.25rem" }}
                        >
                          <option value="solid">Solid</option>
                          <option value="dashed">Dashed</option>
                          <option value="dotted">Dotted</option>
                        </select>
                      </div>
                    )}
                  </div>

                  <div style={{ borderTop: "1px solid #2b2d31", paddingTop: "0.75rem" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
                      <input
                        type="checkbox"
                        id="inner-icon-border"
                        checked={enableInnerBorder}
                        onChange={(e) => setEnableInnerBorder(e.target.checked)}
                      />
                      <label htmlFor="inner-icon-border" style={{ fontSize: "0.75rem", fontWeight: 600, color: "#b5bac1", textTransform: "uppercase" }}>
                        Inner Icon Border
                      </label>
                    </div>
                    {enableInnerBorder && (
                      <div style={{ display: "grid", gridTemplateColumns: "2.5rem minmax(0, 1fr) auto", gap: "0.75rem", alignItems: "center" }}>
                        <input
                          type="color"
                          aria-label="Inner icon border color"
                          value={innerBorderColor}
                          onChange={(e) => setInnerBorderColor(e.target.value)}
                          style={{ width: "2rem", height: "2rem", backgroundColor: "transparent", border: "none", cursor: "pointer" }}
                        />
                        <input
                          type="range"
                          aria-label="Inner icon border width"
                          min="0.5"
                          max="4"
                          step="0.5"
                          value={innerBorderWidth}
                          onChange={(e) => setInnerBorderWidth(Number(e.target.value))}
                          style={{ width: "100%", accentColor: "#57f287" }}
                        />
                        <span style={{ minWidth: "2.5rem", color: "#949ba4", fontSize: "0.7rem" }}>{innerBorderWidth}px</span>
                      </div>
                    )}
                  </div>

                  <div style={{ borderTop: "1px solid #2b2d31", paddingTop: "0.75rem" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
                      <input
                        type="checkbox"
                        id="glow"
                        checked={enableGlow}
                        onChange={(e) => setEnableGlow(e.target.checked)}
                      />
                      <label htmlFor="glow" style={{ fontSize: "0.75rem", fontWeight: 600, color: "#b5bac1", textTransform: "uppercase" }}>
                        Glow Effect
                      </label>
                    </div>
                    {enableGlow && (
                      <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
                        <input
                          type="color"
                          value={glowColor}
                          onChange={(e) => setGlowColor(e.target.value)}
                          style={{ width: "2rem", height: "2rem", backgroundColor: "transparent", border: "none", cursor: "pointer" }}
                        />
                        <div style={{ flex: 1 }}>
                          <label style={{ fontSize: "0.65rem", color: "#b5bac1" }}>Blur ({glowBlur}px)</label>
                          <input
                            type="range"
                            min="2"
                            max="20"
                            value={glowBlur}
                            onChange={(e) => setGlowBlur(Number(e.target.value))}
                            style={{ width: "100%", accentColor: "#57f287" }}
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  <div style={{ borderTop: "1px solid #2b2d31", paddingTop: "0.75rem" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
                      <input
                        type="checkbox"
                        id="shadow"
                        checked={enableShadow}
                        onChange={(e) => setEnableShadow(e.target.checked)}
                      />
                      <label htmlFor="shadow" style={{ fontSize: "0.75rem", fontWeight: 600, color: "#b5bac1", textTransform: "uppercase" }}>
                        Drop Shadow
                      </label>
                    </div>
                    {enableShadow && (
                      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, minmax(0, 1fr))", gap: "0.5rem", alignItems: "center" }}>
                        <input
                          type="color"
                          value={shadowColor}
                          onChange={(e) => setShadowColor(e.target.value)}
                          style={{ width: "2rem", height: "2rem", backgroundColor: "transparent", border: "none", cursor: "pointer" }}
                        />
                        <div>
                          <label style={{ fontSize: "0.65rem", color: "#b5bac1" }}>X ({shadowOffsetX}px)</label>
                          <input
                            type="range"
                            min="-10"
                            max="10"
                            value={shadowOffsetX}
                            onChange={(e) => setShadowOffsetX(Number(e.target.value))}
                            style={{ width: "100%", accentColor: "#57f287" }}
                          />
                        </div>
                        <div>
                          <label style={{ fontSize: "0.65rem", color: "#b5bac1" }}>Y ({shadowOffsetY}px)</label>
                          <input
                            type="range"
                            min="-10"
                            max="10"
                            value={shadowOffsetY}
                            onChange={(e) => setShadowOffsetY(Number(e.target.value))}
                            style={{ width: "100%", accentColor: "#57f287" }}
                          />
                        </div>
                        <div>
                          <label style={{ fontSize: "0.65rem", color: "#b5bac1" }}>Blur ({shadowBlur}px)</label>
                          <input
                            type="range"
                            min="0"
                            max="15"
                            value={shadowBlur}
                            onChange={(e) => setShadowBlur(Number(e.target.value))}
                            style={{ width: "100%", accentColor: "#57f287" }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="role-icon-preview-column" style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            <div style={{ backgroundColor: "#1e2024", border: "1px solid #2b2d31", borderRadius: "0.5rem", padding: "1.5rem", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", position: "relative", minHeight: "220px" }}>
              <div 
                style={{
                  width: "9rem",
                  height: "9rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "0.5rem",
                  padding: "0.5rem",
                  backgroundImage: "radial-gradient(#2b2d31 1px, transparent 0)",
                  backgroundSize: "12px 12px"
                }}
              >
                <svg
                  ref={svgRef}
                  viewBox="0 0 100 100"
                  style={{ 
                    width: "7rem", 
                    height: "7rem", 
                    filter: getFilterStyle()
                  }}
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <clipPath id="shapeClip" clipPathUnits="userSpaceOnUse">
                      {currentShapeObj?.path ? (
                        <path d={currentShapeObj.path} />
                      ) : (
                        <rect x="0" y="0" width="100" height="100" rx={currentShapeObj?.id === "rounded-square" ? shapeCornerRadius : currentShapeObj?.rx || "0"} />
                      )}
                    </clipPath>
                    <linearGradient 
                      id="bgGrad" 
                      x1={`${Math.cos((bgGradientAngle * Math.PI) / 180) < 0 ? 100 : 0}%`}
                      y1={`${Math.sin((bgGradientAngle * Math.PI) / 180) < 0 ? 100 : 0}%`}
                      x2={`${Math.cos((bgGradientAngle * Math.PI) / 180) >= 0 ? 100 : 0}%`}
                      y2={`${Math.sin((bgGradientAngle * Math.PI) / 180) >= 0 ? 100 : 0}%`}
                    >
                      <stop offset="0%" stopColor={bgColor} />
                      <stop offset="100%" stopColor={bgGradientEnd} />
                    </linearGradient>

                    <linearGradient 
                      id="iconGrad" 
                      gradientUnits="userSpaceOnUse"
                      x1={12 - Math.cos((iconGradientAngle * Math.PI) / 180) * 12}
                      y1={12 - Math.sin((iconGradientAngle * Math.PI) / 180) * 12}
                      x2={12 + Math.cos((iconGradientAngle * Math.PI) / 180) * 12}
                      y2={12 + Math.sin((iconGradientAngle * Math.PI) / 180) * 12}
                    >
                      <stop offset="0%" stopColor={iconColor} />
                      <stop offset="100%" stopColor={iconGradientEnd} />
                    </linearGradient>

                    <linearGradient
                      id="textGrad"
                      gradientUnits="userSpaceOnUse"
                      x1={50 - Math.cos((iconGradientAngle * Math.PI) / 180) * 50}
                      y1={50 - Math.sin((iconGradientAngle * Math.PI) / 180) * 50}
                      x2={50 + Math.cos((iconGradientAngle * Math.PI) / 180) * 50}
                      y2={50 + Math.sin((iconGradientAngle * Math.PI) / 180) * 50}
                    >
                      <stop offset="0%" stopColor={iconColor} />
                      <stop offset="100%" stopColor={iconGradientEnd} />
                    </linearGradient>
                  </defs>

                  <g transform={`translate(50, 50) scale(${shapeScale / 100}) rotate(${shapeRotation}) translate(-50, -50)`}>
                    {backgroundImage && (
                      <image href={backgroundImage} x="0" y="0" width="100" height="100" preserveAspectRatio="xMidYMid slice" clipPath="url(#shapeClip)" />
                    )}
                    {currentShapeObj?.path ? (
                      <path 
                        d={currentShapeObj.path} 
                        fill={backgroundImage ? "none" : useGradientBg ? "url(#bgGrad)" : bgColor}
                        stroke={enableBorder ? borderColor : "none"}
                        strokeWidth={enableBorder ? borderWidth : 0}
                        strokeDasharray={getDashArray()}
                      />
                    ) : (
                      <rect
                        x="0"
                        y="0"
                        width="100"
                        height="100"
                        rx={currentShapeObj?.id === "rounded-square" ? shapeCornerRadius : currentShapeObj?.rx || "0"}
                        fill={backgroundImage ? "none" : useGradientBg ? "url(#bgGrad)" : bgColor}
                        stroke={enableBorder ? borderColor : "none"}
                        strokeWidth={enableBorder ? borderWidth : 0}
                        strokeDasharray={getDashArray()}
                      />
                    )}
                  </g>

                  <g 
                    transform={`translate(${iconOffsetX}, ${iconOffsetY}) rotate(${iconRotation} 50 50)`}
                    opacity={iconOpacity / 100}
                  >
                    {uploadedImage ? (
                      <image
                        href={uploadedImage}
                        x={50 - iconSize / 2}
                        y={50 - iconSize / 2}
                        width={iconSize}
                        height={iconSize}
                        preserveAspectRatio="xMidYMid slice"
                      />
                    ) : customText ? (
                      <text
                        x="50%"
                        y="50%"
                        dominantBaseline="central"
                        textAnchor="middle"
                        fill={useGradientIcon ? "url(#textGrad)" : iconColor}
                        fontSize={Math.floor(iconSize * 0.5)}
                        fontWeight={fontWeight}
                        fontFamily={fontFamily}
                        stroke={enableInnerBorder ? innerBorderColor : undefined}
                        strokeWidth={enableInnerBorder ? innerBorderWidth : undefined}
                        paintOrder="stroke"
                      >
                        {customText}
                      </text>
                    ) : (
                      <g transform={`translate(${50 - iconSize / 2}, ${50 - iconSize / 2})`}>
                        {enableInnerBorder && (
                          <SelectedIconComponent
                            size={iconSize}
                            color={innerBorderColor}
                            strokeWidth={iconStrokeWidth + innerBorderWidth * 2}
                          />
                        )}
                        <SelectedIconComponent
                          size={iconSize}
                          color={iconColor}
                          stroke={useGradientIcon ? "url(#iconGrad)" : iconColor}
                          strokeWidth={iconStrokeWidth}
                        />
                      </g>
                    )}
                  </g>
                </svg>
              </div>
            </div>

            <div style={{ backgroundColor: "#1e2024", border: "1px solid #2b2d31", borderRadius: "0.5rem", padding: "1rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              <span style={{ fontSize: "0.75rem", fontWeight: 600, color: "#949ba4", letterSpacing: "0.05em", display: "block" }}>
                Discord Preview
              </span>

              <div style={{ backgroundColor: "#313338", borderRadius: "0.375rem", padding: "0.75rem", display: "flex", alignItems: "center", gap: "0.75rem", fontFamily: "inherit", fontSize: "0.875rem" }}>
                <div style={{ width: "2rem", height: "2rem", borderRadius: "9999px", backgroundColor: "#5865f2", display: "flex", alignItems: "center", justifyContent: "center", color: "#ffffff", fontSize: "0.75rem", fontWeight: "bold", flexShrink: 0 }}>
                  S
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.375rem", lineHeight: 1 }}>
                    <span style={{ fontWeight: 600, color: "#ffffff" }}>Soul</span>
                    <svg viewBox="0 0 100 100" style={{ width: "1rem", height: "1rem", display: "inline-block" }}>
                      <defs>
                        <clipPath id="previewShapeClip" clipPathUnits="userSpaceOnUse">
                          {currentShapeObj?.path ? (
                            <path d={currentShapeObj.path} />
                          ) : (
                            <rect x="0" y="0" width="100" height="100" rx={currentShapeObj?.id === "rounded-square" ? shapeCornerRadius : currentShapeObj?.rx || "0"} />
                          )}
                        </clipPath>
                        <linearGradient
                          id="previewIconGrad"
                          gradientUnits="userSpaceOnUse"
                          x1={12 - Math.cos((iconGradientAngle * Math.PI) / 180) * 12}
                          y1={12 - Math.sin((iconGradientAngle * Math.PI) / 180) * 12}
                          x2={12 + Math.cos((iconGradientAngle * Math.PI) / 180) * 12}
                          y2={12 + Math.sin((iconGradientAngle * Math.PI) / 180) * 12}
                        >
                          <stop offset="0%" stopColor={iconColor} />
                          <stop offset="100%" stopColor={iconGradientEnd} />
                        </linearGradient>
                        <linearGradient
                          id="previewTextGrad"
                          gradientUnits="userSpaceOnUse"
                          x1={50 - Math.cos((iconGradientAngle * Math.PI) / 180) * 50}
                          y1={50 - Math.sin((iconGradientAngle * Math.PI) / 180) * 50}
                          x2={50 + Math.cos((iconGradientAngle * Math.PI) / 180) * 50}
                          y2={50 + Math.sin((iconGradientAngle * Math.PI) / 180) * 50}
                        >
                          <stop offset="0%" stopColor={iconColor} />
                          <stop offset="100%" stopColor={iconGradientEnd} />
                        </linearGradient>
                      </defs>
                      {backgroundImage && <image href={backgroundImage} x="0" y="0" width="100" height="100" preserveAspectRatio="xMidYMid slice" clipPath="url(#previewShapeClip)" />}
                      {currentShapeObj?.path ? (
                        <path d={currentShapeObj.path} fill={backgroundImage ? "none" : bgColor} stroke={enableBorder ? borderColor : "none"} strokeWidth={enableBorder ? borderWidth : 0} strokeDasharray={getDashArray()} />
                      ) : (
                        <rect x="0" y="0" width="100" height="100" rx={currentShapeObj?.id === "rounded-square" ? shapeCornerRadius : currentShapeObj?.rx || "0"} fill={backgroundImage ? "none" : bgColor} stroke={enableBorder ? borderColor : "none"} strokeWidth={enableBorder ? borderWidth : 0} strokeDasharray={getDashArray()} />
                      )}
                      {uploadedImage ? (
                        <image href={uploadedImage} x="20" y="20" width="60" height="60" />
                      ) : customText ? (
                        <text x="50%" y="50%" dominantBaseline="central" textAnchor="middle" fill={useGradientIcon ? "url(#previewTextGrad)" : iconColor} fontSize="40" fontWeight={fontWeight} fontFamily={fontFamily} stroke={enableInnerBorder ? innerBorderColor : undefined} strokeWidth={enableInnerBorder ? innerBorderWidth : undefined} paintOrder="stroke">
                          {customText}
                        </text>
                      ) : (
                        <g transform={`translate(${50 - iconSize / 2}, ${50 - iconSize / 2})`}>
                          {enableInnerBorder && <SelectedIconComponent size={iconSize} color={innerBorderColor} strokeWidth={iconStrokeWidth + innerBorderWidth * 2} />}
                          <SelectedIconComponent size={iconSize} color={iconColor} stroke={useGradientIcon ? "url(#previewIconGrad)" : iconColor} strokeWidth={iconStrokeWidth} />
                        </g>
                      )}
                    </svg>
                    <span style={{ fontSize: "10px", color: "#949ba4", fontWeight: 500, marginLeft: "0.25rem" }}>Today at 1:00 PM</span>
                  </div>
                  <p style={{ color: "#dbdee1", fontSize: "0.75rem", marginTop: "0.25rem" }}>
                    This new icon looks so cool!
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={handleDownloadPNG}
              style={{
                width: "100%",
                backgroundColor: "#57f287",
                color: "#0e1015",
                fontWeight: "bold",
                paddingTop: "0.75rem",
                paddingBottom: "0.75rem",
                paddingLeft: "1rem",
                paddingRight: "1rem",
                borderRadius: "0.375rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.5rem",
                border: "none",
                cursor: "pointer"
              }}
            >
              <Download size={18} /> Export PNG (128x128)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}