import ProfileEditForm from "@/components/user-profile/form-edit-user";

export default function Home() {
  return (
    <div className="min-h-screen bg-stone-50">
      <div className="container mx-auto px-4 py-8">
        <ProfileEditForm />
      </div>
    </div>
  );
}
