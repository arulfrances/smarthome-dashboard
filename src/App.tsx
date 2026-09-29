import { useEffect, useState } from 'react';
import type { ReactNode } from 'react';

import {
  Home,
  Lightbulb,
  Bot,
  Settings,
  Plug,
  Snowflake,
  Sun,
  Moon,
  Power,
  ChevronRight,
} from 'lucide-react';

type Theme = 'dark' | 'light';

type Page =
  | 'home'
  | 'devices'
  | 'automation'
  | 'settings';

function App() {
  const [theme, setTheme] = useState<Theme>(() => {
    const savedTheme = localStorage.getItem('smart-home-theme');

    if (savedTheme === 'light' || savedTheme === 'dark') {
      return savedTheme;
    }

    return 'dark';
  });

  const [activePage, setActivePage] = useState<Page>('home');

  const [quickControls, setQuickControls] = useState({
  lights: false,
  plugs: false,
  ac: false,
});

  useEffect(() => {
    localStorage.setItem('smart-home-theme', theme);
  }, [theme]);

  const isDark = theme === 'dark';

  const toggleTheme = () => {
    setTheme((current) =>
      current === 'dark' ? 'light' : 'dark'
    );
  };

const handleQuickControl = (
  type: 'lights' | 'plugs' | 'ac'
) => {
  setQuickControls((current) => ({
    ...current,
    [type]: !current[type],
  }));
};

  const handleRoom = (room: string) => {
    console.log(`Room selected: ${room}`);
  };

  const handleScene = (scene: string) => {
    console.log(`Scene selected: ${scene}`);
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        isDark
          ? 'bg-slate-950 text-white'
          : 'bg-slate-100 text-slate-900'
      }`}
    >
      <div className="mx-auto min-h-screen max-w-7xl">

        {/* ================= HEADER ================= */}

        <header
          className={`border-b px-5 py-5 transition-colors ${
            isDark
              ? 'border-slate-800'
              : 'border-slate-200'
          }`}
        >
          <div className="flex items-center justify-between">

            <div>
              <p
                className={`text-sm ${
                  isDark
                    ? 'text-slate-400'
                    : 'text-slate-500'
                }`}
              >
                Good Evening 👋
              </p>

              <h1 className="mt-1 text-2xl font-bold">
                My Home
              </h1>
            </div>

            <div className="flex items-center gap-3">

              {/* Theme Toggle */}

              <button
                onClick={toggleTheme}
                title={
                  isDark
                    ? 'Switch to light mode'
                    : 'Switch to dark mode'
                }
                className={`flex h-11 w-11 items-center justify-center rounded-full border transition-all ${
                  isDark
                    ? 'border-slate-700 bg-slate-900 text-yellow-300 hover:bg-slate-800'
                    : 'border-slate-300 bg-white text-slate-700 hover:bg-slate-200'
                }`}
              >
                {isDark ? (
                  <Sun size={20} />
                ) : (
                  <Moon size={20} />
                )}
              </button>

              {/* Profile */}

              <button
                onClick={() => setActivePage('settings')}
                className={`flex h-11 w-11 items-center justify-center rounded-full transition ${
                  isDark
                    ? 'bg-slate-800 hover:bg-slate-700'
                    : 'bg-white shadow hover:bg-slate-200'
                }`}
              >
                👤
              </button>

            </div>
          </div>
        </header>

        {/* ================= MAIN ================= */}

        <main className="px-5 py-6 pb-32">

          {activePage === 'home' && (
           <HomePage
  isDark={isDark}
  onQuickControl={handleQuickControl}
  quickControls={quickControls}
  onRoom={handleRoom}
  onScene={handleScene}
/>
          )}

          {activePage === 'devices' && (
            <PlaceholderPage
              title="Devices"
              description="Your connected smart devices will appear here."
              icon={<Lightbulb size={36} />}
              isDark={isDark}
            />
          )}

          {activePage === 'automation' && (
            <PlaceholderPage
              title="Automation"
              description="Create smart home automations and schedules."
              icon={<Bot size={36} />}
              isDark={isDark}
            />
          )}

          {activePage === 'settings' && (
            <PlaceholderPage
              title="Settings"
              description="Manage your home, integrations and preferences."
              icon={<Settings size={36} />}
              isDark={isDark}
            />
          )}

        </main>

        {/* ================= BOTTOM NAV ================= */}

        <nav
          className={`fixed bottom-0 left-0 right-0 z-50 border-t backdrop-blur ${
            isDark
              ? 'border-slate-800 bg-slate-950/95'
              : 'border-slate-200 bg-white/95'
          }`}
        >
          <div className="mx-auto flex max-w-5xl justify-around px-4 py-3">

            <NavItem
              icon={<Home size={21} />}
              label="Home"
              active={activePage === 'home'}
              isDark={isDark}
              onClick={() => setActivePage('home')}
            />

            <NavItem
              icon={<Lightbulb size={21} />}
              label="Devices"
              active={activePage === 'devices'}
              isDark={isDark}
              onClick={() => setActivePage('devices')}
            />

            <NavItem
              icon={<Bot size={21} />}
              label="Automation"
              active={activePage === 'automation'}
              isDark={isDark}
              onClick={() => setActivePage('automation')}
            />

            <NavItem
              icon={<Settings size={21} />}
              label="Settings"
              active={activePage === 'settings'}
              isDark={isDark}
              onClick={() => setActivePage('settings')}
            />

          </div>
        </nav>

      </div>
    </div>
  );
}

/* =========================================================
   HOME PAGE
========================================================= */

function HomePage({
  isDark,
  onQuickControl,
  quickControls,
  onRoom,
  onScene,
}: {
  isDark: boolean;
  onQuickControl: (
    type: 'lights' | 'plugs' | 'ac'
  ) => void;
  quickControls: {
    lights: boolean;
    plugs: boolean;
    ac: boolean;
  };
  onRoom: (room: string) => void;
  onScene: (scene: string) => void;
}) {
  return (
    <>

      {/* Home Status */}

      <section
        className={`rounded-3xl border p-5 ${
          isDark
            ? 'border-slate-800 bg-slate-900'
            : 'border-slate-200 bg-white shadow-sm'
        }`}
      >
        <div className="flex items-center justify-between">

          <div>
            <p
              className={`text-sm ${
                isDark
                  ? 'text-slate-400'
                  : 'text-slate-500'
              }`}
            >
              Home Status
            </p>

            <h2 className="mt-1 text-lg font-semibold">
              Everything looks good
            </h2>

            <p
              className={`mt-1 text-sm ${
                isDark
                  ? 'text-slate-500'
                  : 'text-slate-400'
              }`}
            >
              All connected devices are ready
            </p>
          </div>

          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/10">
            <div className="h-3 w-3 rounded-full bg-emerald-400" />
          </div>

        </div>
      </section>

      {/* Quick Controls */}

      <section className="mt-8">

        <h2 className="mb-4 text-lg font-semibold">
          Quick Controls
        </h2>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">

          <QuickControl
  icon={<Lightbulb />}
  label="Lights"
  description={quickControls.lights ? '3 devices • ON' : '3 devices • OFF'}
  isDark={isDark}
  active={quickControls.lights}
  onClick={() => onQuickControl('lights')}
/>

          <QuickControl
  icon={<Plug />}
  label="Plugs"
  description={quickControls.plugs ? '2 devices • ON' : '2 devices • OFF'}
  isDark={isDark}
  active={quickControls.plugs}
  onClick={() => onQuickControl('plugs')}
/>

          <QuickControl
  icon={<Snowflake />}
  label="AC"
  description={quickControls.ac ? '1 device • ON' : '1 device • OFF'}
  isDark={isDark}
  active={quickControls.ac}
  onClick={() => onQuickControl('ac')}
/>

        </div>

      </section>

      {/* Rooms */}

      <section className="mt-8">

        <div className="mb-4 flex items-center justify-between">

          <h2 className="text-lg font-semibold">
            Rooms
          </h2>

          <button
            className="flex items-center gap-1 text-sm text-indigo-500 hover:text-indigo-400"
            onClick={() => console.log('View all rooms')}
          >
            View all
            <ChevronRight size={16} />
          </button>

        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">

          <RoomCard
            icon="🛋️"
            name="Living Room"
            devices="3 devices"
            activeDevices="2 on"
            isDark={isDark}
            onClick={() => onRoom('Living Room')}
          />

          <RoomCard
            icon="🛏️"
            name="Bedroom"
            devices="2 devices"
            activeDevices="1 on"
            isDark={isDark}
            onClick={() => onRoom('Bedroom')}
          />

          <RoomCard
            icon="🍳"
            name="Kitchen"
            devices="4 devices"
            activeDevices="2 on"
            isDark={isDark}
            onClick={() => onRoom('Kitchen')}
          />

          <RoomCard
            icon="💻"
            name="Office"
            devices="3 devices"
            activeDevices="1 on"
            isDark={isDark}
            onClick={() => onRoom('Office')}
          />

        </div>

      </section>

      {/* Scenes */}

      <section className="mt-8">

        <h2 className="mb-4 text-lg font-semibold">
          Scenes
        </h2>

        <div className="flex gap-3 overflow-x-auto pb-2">

          <SceneButton
            icon="🌅"
            label="Morning"
            isDark={isDark}
            onClick={() => onScene('Morning')}
          />

          <SceneButton
            icon="🎬"
            label="Movie"
            isDark={isDark}
            onClick={() => onScene('Movie')}
          />

          <SceneButton
            icon="🌙"
            label="Night"
            isDark={isDark}
            onClick={() => onScene('Night')}
          />

          <SceneButton
            icon="🏠"
            label="Away"
            isDark={isDark}
            onClick={() => onScene('Away')}
          />

        </div>

      </section>

    </>
  );
}

/* =========================================================
   QUICK CONTROL
========================================================= */

function QuickControl({
  icon,
  label,
  description,
  isDark,
  active,
  onClick,
}: {
  icon: ReactNode;
  label: string;
  description: string;
  isDark: boolean;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      aria-pressed={active}
      className={`group rounded-2xl border p-5 text-left transition-all hover:-translate-y-0.5 ${
        active
          ? isDark
            ? 'border-indigo-500 bg-indigo-500/10'
            : 'border-indigo-400 bg-indigo-50'
          : isDark
            ? 'border-slate-800 bg-slate-900 hover:border-indigo-500 hover:bg-slate-800'
            : 'border-slate-200 bg-white shadow-sm hover:border-indigo-400 hover:shadow-md'
      }`}
    >
      <div className="flex items-center justify-between">

        <div
          className={`flex h-11 w-11 items-center justify-center rounded-xl transition ${
            active
              ? 'bg-indigo-500 text-white'
              : isDark
                ? 'bg-indigo-500/10 text-indigo-400'
                : 'bg-indigo-50 text-indigo-600'
          }`}
        >
          {icon}
        </div>

        <div
          className={`h-3 w-3 rounded-full transition ${
            active
              ? 'bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.7)]'
              : isDark
                ? 'bg-slate-700'
                : 'bg-slate-300'
          }`}
        />

      </div>

      <h3 className="mt-4 font-semibold">
        {label}
      </h3>

      <p
        className={`mt-1 text-sm ${
          active
            ? 'text-indigo-500'
            : isDark
              ? 'text-slate-500'
              : 'text-slate-400'
        }`}
      >
        {description}
      </p>

    </button>
  );
}

/* =========================================================
   ROOM CARD
========================================================= */

function RoomCard({
  icon,
  name,
  devices,
  activeDevices,
  isDark,
  onClick,
}: {
  icon: string;
  name: string;
  devices: string;
  activeDevices: string;
  isDark: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`group rounded-2xl border p-5 text-left transition-all hover:-translate-y-0.5 ${
        isDark
          ? 'border-slate-800 bg-slate-900 hover:border-indigo-500 hover:bg-slate-800'
          : 'border-slate-200 bg-white shadow-sm hover:border-indigo-400 hover:shadow-md'
      }`}
    >
      <div className="flex items-start justify-between">

        <span className="text-3xl">
          {icon}
        </span>

        <ChevronRight
          size={18}
          className={
            isDark
              ? 'text-slate-600 group-hover:text-indigo-400'
              : 'text-slate-400 group-hover:text-indigo-500'
          }
        />

      </div>

      <h3 className="mt-4 font-semibold">
        {name}
      </h3>

      <div className="mt-2 flex gap-3 text-sm">

        <span
          className={
            isDark
              ? 'text-slate-400'
              : 'text-slate-500'
          }
        >
          {devices}
        </span>

        <span className="text-emerald-500">
          • {activeDevices}
        </span>

      </div>
    </button>
  );
}

/* =========================================================
   SCENE
========================================================= */

function SceneButton({
  icon,
  label,
  isDark,
  onClick,
}: {
  icon: string;
  label: string;
  isDark: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`min-w-[105px] rounded-2xl border px-5 py-4 transition-all hover:-translate-y-0.5 ${
        isDark
          ? 'border-slate-800 bg-slate-900 hover:border-indigo-500 hover:bg-slate-800'
          : 'border-slate-200 bg-white shadow-sm hover:border-indigo-400 hover:shadow-md'
      }`}
    >
      <div className="text-2xl">
        {icon}
      </div>

      <div className="mt-2 text-sm font-medium">
        {label}
      </div>
    </button>
  );
}

/* =========================================================
   NAVIGATION
========================================================= */

function NavItem({
  icon,
  label,
  active,
  isDark,
  onClick,
}: {
  icon: ReactNode;
  label: string;
  active: boolean;
  isDark: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex min-w-[70px] flex-col items-center gap-1 transition ${
        active
          ? 'text-indigo-500'
          : isDark
            ? 'text-slate-500 hover:text-slate-300'
            : 'text-slate-400 hover:text-slate-700'
      }`}
    >
      {icon}

      <span className="text-xs">
        {label}
      </span>
    </button>
  );
}

/* =========================================================
   PLACEHOLDER PAGE
========================================================= */

function PlaceholderPage({
  title,
  description,
  icon,
  isDark,
}: {
  title: string;
  description: string;
  icon: ReactNode;
  isDark: boolean;
}) {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">

      <div className="max-w-md text-center">

        <div
          className={`mx-auto flex h-20 w-20 items-center justify-center rounded-3xl ${
            isDark
              ? 'bg-slate-900 text-indigo-400'
              : 'bg-white text-indigo-500 shadow-sm'
          }`}
        >
          {icon}
        </div>

        <h2 className="mt-6 text-2xl font-bold">
          {title}
        </h2>

        <p
          className={`mt-2 ${
            isDark
              ? 'text-slate-400'
              : 'text-slate-500'
          }`}
        >
          {description}
        </p>

        <p
          className={`mt-6 text-sm ${
            isDark
              ? 'text-slate-600'
              : 'text-slate-400'
          }`}
        >
          This section will be connected to Supabase next.
        </p>

      </div>

    </div>
  );
}

export default App;