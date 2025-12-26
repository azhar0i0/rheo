import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MobileLayout } from "@/components/MobileLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  ArrowLeft, Search, Plus, ShoppingCart, Edit2, Trash2,
  Package, DollarSign, Clock, CheckCircle, AlertCircle, Filter
} from "lucide-react";
import { toast } from "sonner";

type ItemStatus = "pending" | "approved" | "purchased" | "rejected";
type ItemPriority = "low" | "medium" | "high" | "urgent";

interface BucketItem {
  id: string;
  name: string;
  description: string;
  quantity: number;
  estimatedCost: number;
  priority: ItemPriority;
  status: ItemStatus;
  requestedBy: string;
  requestedAt: string;
  category: string;
}

const mockItems: BucketItem[] = [
  { 
    id: "1", 
    name: "Office Chairs", 
    description: "Ergonomic office chairs for the new employees", 
    quantity: 5, 
    estimatedCost: 1500, 
    priority: "high", 
    status: "pending", 
    requestedBy: "Sarah Wilson", 
    requestedAt: "2 hours ago",
    category: "Furniture"
  },
  { 
    id: "2", 
    name: "Whiteboard Markers", 
    description: "Assorted colors for meeting room whiteboards", 
    quantity: 20, 
    estimatedCost: 50, 
    priority: "low", 
    status: "approved", 
    requestedBy: "Mike Chen", 
    requestedAt: "1 day ago",
    category: "Stationery"
  },
  { 
    id: "3", 
    name: "Laptop Stands", 
    description: "Adjustable laptop stands for better ergonomics", 
    quantity: 10, 
    estimatedCost: 300, 
    priority: "medium", 
    status: "pending", 
    requestedBy: "Emily Davis", 
    requestedAt: "3 days ago",
    category: "Electronics"
  },
  { 
    id: "4", 
    name: "Printer Paper", 
    description: "A4 paper for office printers (5 reams)", 
    quantity: 5, 
    estimatedCost: 25, 
    priority: "medium", 
    status: "purchased", 
    requestedBy: "James Brown", 
    requestedAt: "1 week ago",
    category: "Stationery"
  },
  { 
    id: "5", 
    name: "Coffee Machine", 
    description: "New coffee machine for the break room", 
    quantity: 1, 
    estimatedCost: 500, 
    priority: "urgent", 
    status: "approved", 
    requestedBy: "Admin", 
    requestedAt: "2 days ago",
    category: "Appliances"
  },
];

const categories = ["Furniture", "Electronics", "Stationery", "Appliances", "Cleaning", "Other"];
const priorities: ItemPriority[] = ["low", "medium", "high", "urgent"];

export default function AdminBucketPage() {
  const navigate = useNavigate();
  const [items, setItems] = useState<BucketItem[]>(mockItems);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<BucketItem | null>(null);
  
  // Form state
  const [newItem, setNewItem] = useState({
    name: "",
    description: "",
    quantity: 1,
    estimatedCost: 0,
    priority: "medium" as ItemPriority,
    category: "Other"
  });

  const getFilteredItems = () => {
    let filtered = items;
    
    if (search) {
      filtered = filtered.filter(item => 
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.description.toLowerCase().includes(search.toLowerCase()) ||
        item.category.toLowerCase().includes(search.toLowerCase())
      );
    }
    
    if (statusFilter !== "all") {
      filtered = filtered.filter(item => item.status === statusFilter);
    }
    
    return filtered;
  };

  const handleAddItem = () => {
    if (!newItem.name.trim()) {
      toast.error("Please enter an item name");
      return;
    }
    
    const item: BucketItem = {
      id: Date.now().toString(),
      ...newItem,
      status: "pending",
      requestedBy: "Admin",
      requestedAt: "Just now"
    };
    
    setItems([item, ...items]);
    setNewItem({ name: "", description: "", quantity: 1, estimatedCost: 0, priority: "medium", category: "Other" });
    setIsAddDialogOpen(false);
    toast.success("Item added to bucket");
  };

  const handleEditItem = () => {
    if (!editingItem) return;
    
    setItems(items.map(item => 
      item.id === editingItem.id ? editingItem : item
    ));
    setEditingItem(null);
    toast.success("Item updated");
  };

  const handleDeleteItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
    toast.success("Item removed from bucket");
  };

  const handleStatusChange = (id: string, status: ItemStatus) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, status } : item
    ));
    toast.success(`Item marked as ${status}`);
  };

  const getStatusColor = (status: ItemStatus) => {
    switch (status) {
      case "pending": return "bg-warning/10 text-warning";
      case "approved": return "bg-primary/10 text-primary";
      case "purchased": return "bg-success/10 text-success";
      case "rejected": return "bg-destructive/10 text-destructive";
    }
  };

  const getPriorityColor = (priority: ItemPriority) => {
    switch (priority) {
      case "low": return "bg-muted text-muted-foreground";
      case "medium": return "bg-primary/10 text-primary";
      case "high": return "bg-warning/10 text-warning";
      case "urgent": return "bg-destructive/10 text-destructive";
    }
  };

  const getStatusIcon = (status: ItemStatus) => {
    switch (status) {
      case "pending": return Clock;
      case "approved": return CheckCircle;
      case "purchased": return Package;
      case "rejected": return AlertCircle;
    }
  };

  const totalEstimatedCost = items
    .filter(i => i.status !== "rejected" && i.status !== "purchased")
    .reduce((sum, item) => sum + item.estimatedCost, 0);

  const pendingCount = items.filter(i => i.status === "pending").length;
  const approvedCount = items.filter(i => i.status === "approved").length;

  return (
    <MobileLayout showNav={false}>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <div className="px-4 pt-6 pb-4 border-b border-border">
          <div className="flex items-center gap-3 mb-4">
            <button
              onClick={() => navigate("/admin")}
              className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center hover:bg-secondary/80 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-foreground" />
            </button>
            <div className="flex-1">
              <h1 className="text-xl font-bold text-foreground">Purchase Bucket</h1>
              <p className="text-xs text-muted-foreground">{items.length} items in bucket</p>
            </div>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button size="sm" className="rounded-xl gap-1.5">
                  <Plus className="w-4 h-4" />
                  Add
                </Button>
              </DialogTrigger>
              <DialogContent className="rounded-3xl max-h-[85vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Add New Item</DialogTitle>
                </DialogHeader>
                <div className="pt-4 space-y-4">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">Item Name</label>
                    <Input
                      value={newItem.name}
                      onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                      placeholder="Enter item name"
                      className="rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">Description</label>
                    <Textarea
                      value={newItem.description}
                      onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                      placeholder="Describe the item and why it's needed"
                      className="rounded-xl resize-none"
                      rows={3}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">Quantity</label>
                      <Input
                        type="number"
                        value={newItem.quantity}
                        onChange={(e) => setNewItem({ ...newItem, quantity: parseInt(e.target.value) || 1 })}
                        min={1}
                        className="rounded-xl"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">Est. Cost ($)</label>
                      <Input
                        type="number"
                        value={newItem.estimatedCost}
                        onChange={(e) => setNewItem({ ...newItem, estimatedCost: parseFloat(e.target.value) || 0 })}
                        min={0}
                        className="rounded-xl"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">Category</label>
                      <Select
                        value={newItem.category}
                        onValueChange={(value) => setNewItem({ ...newItem, category: value })}
                      >
                        <SelectTrigger className="rounded-xl">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((cat) => (
                            <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">Priority</label>
                      <Select
                        value={newItem.priority}
                        onValueChange={(value) => setNewItem({ ...newItem, priority: value as ItemPriority })}
                      >
                        <SelectTrigger className="rounded-xl">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {priorities.map((p) => (
                            <SelectItem key={p} value={p} className="capitalize">{p}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <Button onClick={handleAddItem} className="w-full rounded-xl">
                    Add to Bucket
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search items..."
              className="pl-10 h-11 rounded-xl bg-secondary border-0"
            />
          </div>
        </div>

        {/* Stats Cards */}
        <div className="px-4 pt-4">
          <div className="grid grid-cols-3 gap-2 mb-4">
            <Card className="p-3 rounded-xl border-border text-center">
              <div className="flex items-center justify-center gap-1.5 mb-1">
                <Clock className="w-3.5 h-3.5 text-warning" />
                <span className="text-lg font-bold text-foreground">{pendingCount}</span>
              </div>
              <p className="text-[10px] text-muted-foreground">Pending</p>
            </Card>
            <Card className="p-3 rounded-xl border-border text-center">
              <div className="flex items-center justify-center gap-1.5 mb-1">
                <CheckCircle className="w-3.5 h-3.5 text-primary" />
                <span className="text-lg font-bold text-foreground">{approvedCount}</span>
              </div>
              <p className="text-[10px] text-muted-foreground">Approved</p>
            </Card>
            <Card className="p-3 rounded-xl border-border text-center">
              <div className="flex items-center justify-center gap-1.5 mb-1">
                <DollarSign className="w-3.5 h-3.5 text-success" />
                <span className="text-lg font-bold text-foreground">${totalEstimatedCost}</span>
              </div>
              <p className="text-[10px] text-muted-foreground">Est. Total</p>
            </Card>
          </div>

          {/* Filter */}
          <div className="flex gap-2 mb-4">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="h-9 rounded-lg bg-secondary border-0 text-xs flex-1">
                <Filter className="w-3.5 h-3.5 mr-2" />
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="purchased">Purchased</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Items List */}
        <div className="px-4 pb-6 space-y-3">
          {getFilteredItems().map((item) => {
            const StatusIcon = getStatusIcon(item.status);
            return (
              <Card key={item.id} className="p-4 rounded-2xl border-border">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-foreground">{item.name}</h3>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${getPriorityColor(item.priority)}`}>
                        {item.priority}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground line-clamp-2">{item.description}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-8 w-8 p-0 rounded-lg"
                          onClick={() => setEditingItem(item)}
                        >
                          <Edit2 className="w-4 h-4 text-muted-foreground" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="rounded-3xl max-h-[85vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle>Edit Item</DialogTitle>
                        </DialogHeader>
                        {editingItem && (
                          <div className="pt-4 space-y-4">
                            <div>
                              <label className="text-sm font-medium text-foreground mb-2 block">Item Name</label>
                              <Input
                                value={editingItem.name}
                                onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                                className="rounded-xl"
                              />
                            </div>
                            <div>
                              <label className="text-sm font-medium text-foreground mb-2 block">Description</label>
                              <Textarea
                                value={editingItem.description}
                                onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
                                className="rounded-xl resize-none"
                                rows={3}
                              />
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                              <div>
                                <label className="text-sm font-medium text-foreground mb-2 block">Quantity</label>
                                <Input
                                  type="number"
                                  value={editingItem.quantity}
                                  onChange={(e) => setEditingItem({ ...editingItem, quantity: parseInt(e.target.value) || 1 })}
                                  min={1}
                                  className="rounded-xl"
                                />
                              </div>
                              <div>
                                <label className="text-sm font-medium text-foreground mb-2 block">Est. Cost ($)</label>
                                <Input
                                  type="number"
                                  value={editingItem.estimatedCost}
                                  onChange={(e) => setEditingItem({ ...editingItem, estimatedCost: parseFloat(e.target.value) || 0 })}
                                  min={0}
                                  className="rounded-xl"
                                />
                              </div>
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                              <div>
                                <label className="text-sm font-medium text-foreground mb-2 block">Category</label>
                                <Select
                                  value={editingItem.category}
                                  onValueChange={(value) => setEditingItem({ ...editingItem, category: value })}
                                >
                                  <SelectTrigger className="rounded-xl">
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {categories.map((cat) => (
                                      <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </div>
                              <div>
                                <label className="text-sm font-medium text-foreground mb-2 block">Priority</label>
                                <Select
                                  value={editingItem.priority}
                                  onValueChange={(value) => setEditingItem({ ...editingItem, priority: value as ItemPriority })}
                                >
                                  <SelectTrigger className="rounded-xl">
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {priorities.map((p) => (
                                      <SelectItem key={p} value={p} className="capitalize">{p}</SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>
                            <div>
                              <label className="text-sm font-medium text-foreground mb-2 block">Status</label>
                              <Select
                                value={editingItem.status}
                                onValueChange={(value) => setEditingItem({ ...editingItem, status: value as ItemStatus })}
                              >
                                <SelectTrigger className="rounded-xl">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="pending">Pending</SelectItem>
                                  <SelectItem value="approved">Approved</SelectItem>
                                  <SelectItem value="purchased">Purchased</SelectItem>
                                  <SelectItem value="rejected">Rejected</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <Button onClick={handleEditItem} className="w-full rounded-xl">
                              Save Changes
                            </Button>
                          </div>
                        )}
                      </DialogContent>
                    </Dialog>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-8 w-8 p-0 rounded-lg text-destructive hover:text-destructive hover:bg-destructive/10"
                      onClick={() => handleDeleteItem(item.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3">
                    <span className="text-muted-foreground">
                      Qty: <span className="text-foreground font-medium">{item.quantity}</span>
                    </span>
                    <span className="text-muted-foreground">
                      Cost: <span className="text-foreground font-medium">${item.estimatedCost}</span>
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-secondary text-muted-foreground text-[10px]">
                      {item.category}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 rounded-lg text-xs font-medium flex items-center gap-1.5 ${getStatusColor(item.status)}`}>
                      <StatusIcon className="w-3 h-3" />
                      {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    {item.status === "pending" && (
                      <>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-7 px-2 rounded-lg text-xs text-primary hover:bg-primary/10"
                          onClick={() => handleStatusChange(item.id, "approved")}
                        >
                          Approve
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-7 px-2 rounded-lg text-xs text-destructive hover:bg-destructive/10"
                          onClick={() => handleStatusChange(item.id, "rejected")}
                        >
                          Reject
                        </Button>
                      </>
                    )}
                    {item.status === "approved" && (
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-7 px-2 rounded-lg text-xs text-success hover:bg-success/10"
                        onClick={() => handleStatusChange(item.id, "purchased")}
                      >
                        Mark Purchased
                      </Button>
                    )}
                  </div>
                </div>

                <p className="text-[10px] text-muted-foreground mt-2">
                  Requested by {item.requestedBy} · {item.requestedAt}
                </p>
              </Card>
            );
          })}

          {getFilteredItems().length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mx-auto mb-4">
                <ShoppingCart className="w-8 h-8 text-muted-foreground" />
              </div>
              <p className="text-foreground font-medium">No items found</p>
              <p className="text-sm text-muted-foreground">Add items to the purchase bucket</p>
            </div>
          )}
        </div>
      </div>
    </MobileLayout>
  );
}
