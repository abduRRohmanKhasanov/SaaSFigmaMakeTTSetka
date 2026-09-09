import { Routes, Route, Navigate } from "react-router-dom";

import { PlayerShell } from "@/layouts/PlayerShell";
import { AdminShell } from "@/layouts/AdminShell";

// Platform
import { LandingPage } from "@/pages/platform/LandingPage";
import { LoginPage } from "@/pages/platform/LoginPage";
import { RegisterPage } from "@/pages/platform/RegisterPage";
import { MyClubsPage } from "@/pages/platform/MyClubsPage";
import { NewClubPage } from "@/pages/platform/NewClubPage";

// Club
import { FeedPage } from "@/pages/club/FeedPage";
import { FeedEmptyPage } from "@/pages/club/FeedEmptyPage";
import { RatingPage } from "@/pages/club/RatingPage";
import { ProfilePage } from "@/pages/club/ProfilePage";
import { PlayerCardPage } from "@/pages/club/PlayerCardPage";
import { H2HPage } from "@/pages/club/H2HPage";
import { TournamentsPage } from "@/pages/club/TournamentsPage";
import { TournamentCardPage } from "@/pages/club/TournamentCardPage";
import { RulesPage } from "@/pages/club/RulesPage";

// Admin
import { DashboardPage } from "@/pages/admin/DashboardPage";
import { PlayersPage } from "@/pages/admin/PlayersPage";
import { PlayerEditPage } from "@/pages/admin/PlayerEditPage";
import { AdminTournamentsPage } from "@/pages/admin/AdminTournamentsPage";
import { NewTournamentPage } from "@/pages/admin/NewTournamentPage";
import { AdminTournamentCardPage } from "@/pages/admin/AdminTournamentCardPage";
import { ConsolePage } from "@/pages/admin/ConsolePage";
import { SettingsPage } from "@/pages/admin/SettingsPage";
import { TablesPage } from "@/pages/admin/TablesPage";
import { AuditPage } from "@/pages/admin/AuditPage";

// Referee & Styleguide
import { RefereePage } from "@/pages/referee/RefereePage";
import { StyleguidePage } from "@/pages/StyleguidePage";

export default function App() {
  return (
    <div className="h-full bg-surface">
      <Routes>
        {/* Platform */}
        <Route path="/"            element={<LandingPage />} />
        <Route path="/login"       element={<LoginPage />} />
        <Route path="/register"    element={<RegisterPage />} />
        <Route path="/platform"    element={<MyClubsPage />} />
        <Route path="/platform/empty" element={<MyClubsPage empty />} />
        <Route path="/platform/new"   element={<NewClubPage />} />

        {/* Club — Player Shell */}
        <Route path="/club" element={<PlayerShell />}>
          <Route index           element={<FeedPage />} />
          <Route path="empty"    element={<FeedEmptyPage />} />
          <Route path="rating"   element={<RatingPage />} />
          <Route path="profile"  element={<ProfilePage />} />
          <Route path="profile/selected" element={<ProfilePage selected />} />
          <Route path="player/:id"       element={<PlayerCardPage />} />
          <Route path="h2h/:id1/:id2"   element={<H2HPage />} />
          <Route path="tournaments"      element={<TournamentsPage />} />
          <Route path="tournaments/:id"  element={<TournamentCardPage />} />
          <Route path="rules"            element={<RulesPage />} />
        </Route>

        {/* Admin Shell */}
        <Route path="/admin" element={<AdminShell />}>
          <Route index                               element={<DashboardPage />} />
          <Route path="players"                      element={<PlayersPage />} />
          <Route path="players/:id"                  element={<PlayerEditPage />} />
          <Route path="tournaments"                  element={<AdminTournamentsPage />} />
          <Route path="tournaments/new"              element={<NewTournamentPage />} />
          <Route path="tournaments/:id"              element={<AdminTournamentCardPage />} />
          <Route path="settings"                     element={<SettingsPage />} />
          <Route path="tables"                       element={<TablesPage />} />
          <Route path="audit"                        element={<AuditPage />} />
        </Route>

        {/* Task Shell */}
        <Route path="/admin/tournaments/:id/console" element={<ConsolePage />} />
        <Route path="/referee"   element={<RefereePage />} />

        {/* Styleguide */}
        <Route path="/styleguide" element={<StyleguidePage />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}
