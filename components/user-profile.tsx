"use client"

import { useUser } from "@/hooks/use-user"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { useState } from "react"

export function UserProfile() {
  const { user, updateUser } = useUser()
  const [isEditing, setIsEditing] = useState(false)
  const [tempName, setTempName] = useState(user?.name || "")

  const handleNameUpdate = () => {
    if (tempName.trim() && user) {
      updateUser({ name: tempName.trim() })
      setIsEditing(false)
    }
  }

  if (!user) return null

  const progressPercentage = user.xp % 100
  const nextLevelXP = user.level * 100

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-sm">Perfil</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {isEditing ? (
          <div className="space-y-2">
            <Input
              value={tempName}
              onChange={(e) => setTempName(e.target.value)}
              onBlur={handleNameUpdate}
              onKeyDown={(e) => e.key === "Enter" && handleNameUpdate()}
              className="h-8 text-sm"
              autoFocus
            />
          </div>
        ) : (
          <div className="cursor-pointer hover:bg-accent rounded p-1 -m-1" onClick={() => setIsEditing(true)}>
            <p className="font-medium text-sm">{user.name}</p>
          </div>
        )}

        <div className="space-y-2">
          <div className="flex justify-between text-xs">
            <span>Nivel {user.level}</span>
            <span>
              {user.xp}/{nextLevelXP} XP
            </span>
          </div>
          <Progress value={progressPercentage} className="h-2" />
        </div>

        {user.badges && user.badges.length > 0 && (
          <div className="space-y-2">
            <p className="text-xs font-medium">Insignias</p>
            <div className="flex flex-wrap gap-1">
              {user.badges.slice(0, 3).map((badge, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {badge}
                </Badge>
              ))}
              {user.badges.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{user.badges.length - 3}
                </Badge>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
