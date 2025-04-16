import { useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calendar } from '@/components/ui/calendar';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import InputError from '@/components/input-error';

type  DomainForm ={
  name: string;
  registrar: string;
  registration_date: string;
  expiry_date: string;
  auto_renew: boolean;
  purchase_price: number;
  current_value?: number;
  asking_price?: number;
  for_sale: boolean;
  status: string;
  notes: string;
}

const CreateDomain = () => {
  const { data, setData, post, processing, errors, reset } = useForm<DomainForm>({
    name: '',
    registrar: '',
    registration_date: '',
    expiry_date: '',
    auto_renew: false,
    purchase_price: 0,
    current_value: undefined,
    asking_price: undefined,
    for_sale: false,
    status: 'active',
    notes: '',
  });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    post(route('domains.store'));
  };

  const handleDateChange = (field: 'registration_date' | 'expiry_date', date?: Date) => {
    if (date) {
      setData(field, format(date, 'yyyy-MM-dd'));
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6 max-w-xl mx-auto">Add New Domain</h1>
      
      <form onSubmit={submit} className="space-y-8 max-w-xl mx-auto">
        <div className="grid gap-y-6">
          {/* Domain Name */}
          <div className="grid gap-2">
            <Label htmlFor="name">Domain Name</Label>
            <Input
              id="name"
              type="text"
              required
              value={data.name}
              onChange={(e) => setData('name', e.target.value)}
              disabled={processing}
              placeholder="example.com"
            />
            <InputError message={errors.name} className="mt-2" />
          </div>

          {/* Registrar */}
          <div className="grid gap-2">
            <Label htmlFor="registrar">Registrar</Label>
            <Input
              id="registrar"
              type="text"
              value={data.registrar}
              onChange={(e) => setData('registrar', e.target.value)}
              disabled={processing}
              placeholder="GoDaddy, Namecheap, etc."
            />
            <InputError message={errors.registrar} className="mt-2" />
          </div>

          {/* Registration Date */}
          <div className="grid gap-2">
            <Label>Registration Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !data.registration_date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {data.registration_date ? (
                    format(new Date(data.registration_date), 'PPP')
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={data.registration_date ? new Date(data.registration_date) : undefined}
                  onSelect={(date) => handleDateChange('registration_date', date)}
                  disabled={(date) => date > new Date() || date < new Date('1900-01-01')}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            <InputError message={errors.registration_date} className="mt-2" />
          </div>

          {/* Expiry Date */}
          <div className="grid gap-2">
            <Label>Expiry Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !data.expiry_date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {data.expiry_date ? (
                    format(new Date(data.expiry_date), 'PPP')
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={data.expiry_date ? new Date(data.expiry_date) : undefined}
                  onSelect={(date) => handleDateChange('expiry_date', date)}
                  disabled={(date) => date < new Date()}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            <InputError message={errors.expiry_date} className="mt-2" />
          </div>

          {/* Auto Renew */}
          <div className="flex items-center space-x-4 rounded-lg border p-4">
            <div className="flex-1 space-y-1">
              <Label htmlFor="auto_renew">Auto Renew</Label>
              <p className="text-sm text-muted-foreground">
                Automatically renew this domain before expiry
              </p>
            </div>
            <Switch
              id="auto_renew"
              checked={data.auto_renew}
              onCheckedChange={(checked) => setData('auto_renew', checked)}
              disabled={processing}
            />
          </div>

          {/* Purchase Price */}
          <div className="grid gap-2">
            <Label htmlFor="purchase_price">Purchase Price ($)</Label>
            <Input
              id="purchase_price"
              type="number"
              step="0.01"
              value={data.purchase_price}
              onChange={(e) => setData('purchase_price', parseFloat(e.target.value) || 0)}
              disabled={processing}
            />
            <InputError message={errors.purchase_price} className="mt-2" />
          </div>

          {/* Current Value */}
          <div className="grid gap-2">
            <Label htmlFor="current_value">Current Value ($)</Label>
            <Input
              id="current_value"
              type="number"
              step="0.01"
              value={data.current_value || ''}
              onChange={(e) => setData('current_value', parseFloat(e.target.value) || undefined)}
              disabled={processing}
            />
            <InputError message={errors.current_value} className="mt-2" />
          </div>

          {/* For Sale */}
          <div className="flex items-center space-x-4 rounded-lg border p-4">
            <div className="flex-1 space-y-1">
              <Label htmlFor="for_sale">List for Sale</Label>
              <p className="text-sm text-muted-foreground">
                Mark this domain as available for purchase
              </p>
            </div>
            <Switch
              id="for_sale"
              checked={data.for_sale}
              onCheckedChange={(checked) => setData('for_sale', checked)}
              disabled={processing}
            />
          </div>

          {/* Asking Price (conditionally shown) */}
          {data.for_sale && (
            <div className="grid gap-2">
              <Label htmlFor="asking_price">Asking Price ($)</Label>
              <Input
                id="asking_price"
                type="number"
                step="0.01"
                value={data.asking_price || ''}
                onChange={(e) => setData('asking_price', parseFloat(e.target.value) || undefined)}
                disabled={processing}
              />
              <InputError message={errors.asking_price} className="mt-2" />
            </div>
          )}

          {/* Status */}
          <div className="grid gap-2">
            <Label htmlFor="status">Status</Label>
            <select
              id="status"
              value={data.status}
              onChange={(e) => setData('status', e.target.value)}
              disabled={processing}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <option value="active">Active</option>
              <option value="expired">Expired</option>
              <option value="pending">Pending</option>
              <option value="sold">Sold</option>
            </select>
            <InputError message={errors.status} className="mt-2" />
          </div>

          {/* Notes */}
          <div className=" grid gap-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              value={data.notes}
              onChange={(e) => setData('notes', e.target.value)}
              disabled={processing}
              placeholder="Any additional notes about this domain..."
              className="resize-none"
            />
            <InputError message={errors.notes} className="mt-2" />
          </div>
        </div>

        <Button type="submit" disabled={processing}>
          {processing ? 'Processing...' : 'Add Domain'}
        </Button>
      </form>
    </div>
  );
};

export default CreateDomain;