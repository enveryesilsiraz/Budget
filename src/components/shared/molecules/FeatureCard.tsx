const FeatureCard = ({ title, description }: { title: string; description: string }) => (
    <div className="p-4 bg-content1 rounded-lg shadow-md hover:shadow-lg transition">
      <h3 className="text-lg font-semibold ">{title}</h3>
      <p className="text-sm  mt-2">{description}</p>
    </div>
  );
  export default FeatureCard;