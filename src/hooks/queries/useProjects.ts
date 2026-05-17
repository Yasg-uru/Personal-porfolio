import { useQuery } from "@tanstack/react-query"
import * as projectsService from "@/services/projects.service"

export const useProjects = () => {
  return useQuery({
    queryKey: ["projects"],
    queryFn: async () => {
      const data = await projectsService.fetchProjects()
      return data.projects
    },
  })
}

export const useProjectDetails = (projectId: string) => {
  return useQuery({
    queryKey: ["project", projectId],
    queryFn: async () => {
      const data = await projectsService.fetchProjectById(projectId)
      return data.data
    },
    enabled: !!projectId,
  })
}

export const useGitHubContributions = (username: string) => {
  return useQuery({
    queryKey: ["github-contributions", username],
    queryFn: async () => {
      const githubToken = import.meta.env.VITE_GITHUB_TOKEN

      if (!githubToken) {
        throw new Error(
          "Missing VITE_GITHUB_TOKEN. Add a valid GitHub personal access token to your frontend environment variables."
        )
      }

      const query = `
        query($username: String!) {
          user(login: $username) {
            contributionsCollection {
              contributionCalendar {
                totalContributions
                weeks {
                  contributionDays {
                    date
                    contributionCount
                    color
                  }
                }
              }
            }
          }
        }
      `

      const variables = {
        username,
      }

      try {
        const response = await fetch("https://api.github.com/graphql", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${githubToken}`,
          },
          body: JSON.stringify({ query, variables }),
        })

        const data = await response.json()

        if (data.errors) {
          throw new Error(data.errors[0]?.message || "GitHub API error")
        }

        return data.data
      } catch (error) {
        throw error
      }
    },
    enabled: !!username,
  })
}
