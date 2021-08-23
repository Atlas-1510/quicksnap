export default async function getFirestore(ref) {
  const doc = await ref.get();
  if (doc) {
    return doc.data();
  } else {
    console.log("No user document found");
  }
}
