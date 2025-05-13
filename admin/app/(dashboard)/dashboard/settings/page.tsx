import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">
          Manage your application settings
        </p>
      </div>
      
      <Separator />
      
      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>General Settings</CardTitle>
            <CardDescription>
              Configure general settings for the IELTS mock system
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium" htmlFor="appName">
                Application Name
              </label>
              <Input id="appName" defaultValue="IELTS Mock Admin" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium" htmlFor="appDesc">
                Description
              </label>
              <Input id="appDesc" defaultValue="Admin control panel for IELTS mock tests" />
            </div>
          </CardContent>
          <CardFooter>
            <Button>Save Changes</Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>MongoDB Settings</CardTitle>
            <CardDescription>
              Configure your MongoDB connection settings
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium" htmlFor="mongoUri">
                MongoDB URI
              </label>
              <Input id="mongoUri" defaultValue="mongodb://localhost:27017/ielts-mock" type="password" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium" htmlFor="dbName">
                Database Name
              </label>
              <Input id="dbName" defaultValue="ielts-mock" />
            </div>
          </CardContent>
          <CardFooter>
            <Button>Update Connection</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}