import { create } from "zustand";
import { teams } from "../utils/Teams";
import type { TeamMember } from "../utils/types";
import { createSelectors } from "./create-selectors";
import { persist } from "zustand/middleware";

type TeamStore = {
  teams: TeamMember[];
  getTeamById: (id: string) => TeamMember | undefined;
  addTeam: (team: TeamMember) => void;
  updateTeam: (id: string, updatedTeam: TeamMember) => void;
  deleteTeam: (id: string) => void;
};

const useTeamStore = create<TeamStore>()(
  persist(
    (set, get) => ({
      teams: teams,
      getTeamById: (id) => {
        return get().teams.find((team) => team.id === id);
      },
      addTeam: (team: TeamMember) => {
        set({
          teams: [team, ...get().teams],
        });
      },
      updateTeam: (id, updatedTeam) => {
        set({
          teams: get().teams.map((team) => {
            if (team.id === id) {
              return {
                ...team,
                ...updatedTeam,
              };
            }
            return team;
          }),
        });
      },
      deleteTeam: (id) => {
        set({
          teams: get().teams.filter((team) => team.id !== id),
        });
      },
    }),
    {
      name: "teams",
    },
  ),
);

export const teamSelector = createSelectors(useTeamStore);

export default useTeamStore;
