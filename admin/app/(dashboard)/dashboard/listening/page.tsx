import React from 'react'
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Link from "next/link";

async function getPassages() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ''}/api/passage?type=listening`, { cache: 'no-store' });
  if (!res.ok) return [];
  return res.json();
}

const Listen = async () => {
  const passages = await getPassages();

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-2">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-1 flex items-center gap-2">
            <span className="inline-block bg-gradient-to-r from-blue-500 to-indigo-600 text-transparent bg-clip-text">Listenings</span>
            <span className="ml-2 inline-flex items-center rounded-full bg-blue-100 px-2 py-0.5 text-xs font-semibold text-blue-700 dark:bg-blue-900/30 dark:text-blue-200">{passages.length}</span>
          </h1>
          <p className="text-gray-500 dark:text-gray-300 text-sm">Manage all your IELTS listening tests here.</p>
        </div>
        <Button asChild className="h-11 px-6 text-base font-semibold bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 shadow-md">
          <Link href="/dashboard/listening/create-listening">
            <Plus className="mr-2 h-5 w-5" /> New Listening
          </Link>
        </Button>
      </div>
      <Separator />
      <div className="overflow-x-auto">
        <div className="rounded-xl shadow-md bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50 dark:bg-gray-800">
                <TableHead className="text-gray-700 dark:text-gray-200 font-semibold">Title</TableHead>
                <TableHead className="text-gray-700 dark:text-gray-200 font-semibold">Type</TableHead>
                <TableHead className="text-gray-700 dark:text-gray-200 font-semibold">Description</TableHead>
                <TableHead className="text-gray-700 dark:text-gray-200 font-semibold text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {passages.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-10 text-gray-400 dark:text-gray-500 text-lg">
                    No listenings found. Click <span className="font-semibold text-blue-600 dark:text-blue-400">New Listening</span> to add your first one!
                  </TableCell>
                </TableRow>
              ) : (
                passages.map((p: any) => (
                  <TableRow key={p._id} className="hover:bg-blue-50/60 dark:hover:bg-blue-900/30 transition-colors">
                    <TableCell className="font-medium text-gray-900 dark:text-white">
                      {p.title || <span className="italic text-gray-400">No title</span>}
                    </TableCell>
                    <TableCell>
                      <span className={
                        p.type === 'listening'
                          ? 'inline-block rounded-full bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-200 px-2 py-0.5 text-xs font-semibold'
                          : 'inline-block rounded-full bg-gray-100 text-gray-800 dark:bg-gray-800/30 dark:text-gray-200 px-2 py-0.5 text-xs font-semibold'
                      }>
                        {p.type}
                      </span>
                    </TableCell>
                    <TableCell>{p.description || <span className="italic text-gray-400">No description</span>}</TableCell>
                    <TableCell className="flex gap-2 justify-center">
                      <Button asChild size="sm" variant="secondary" className="group border-green-200 dark:border-green-800 hover:bg-green-200 dark:hover:bg-green-800/40">
                        <Link href={`/dashboard/listening/${p._id}/view`} className="flex items-center gap-1">
                          <span>View</span>
                        </Link>
                      </Button>
                      <Button asChild size="sm" variant="outline" className="group border-green-200 dark:border-green-800 hover:bg-green-100 dark:hover:bg-green-900/40">
                        <Link href={`/dashboard/listening/${p._id}/edit`} className="flex items-center gap-1">
                          <Pencil className="h-4 w-4 group-hover:text-green-700 transition-colors" />
                          <span>Edit</span>
                        </Link>
                      </Button>
                      <Button asChild size="sm" variant="destructive" className="group hover:bg-red-100 dark:hover:bg-red-900/40">
                        <Link href={`/dashboard/listening/${p._id}/delete`} className="flex items-center gap-1">
                          <Trash2 className="h-4 w-4 group-hover:text-red-700 transition-colors" />
                          <span>Delete</span>
                        </Link>
                      </Button>
                      <Button asChild size="sm" variant="secondary" className="group border-green-200 dark:border-green-800 hover:bg-green-200 dark:hover:bg-green-800/40">
                        <Link href={`/dashboard/listening/${p._id}/questions`} className="flex items-center gap-1">
                          <span>Questions</span>
                        </Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}

export default Listen