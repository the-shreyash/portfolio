import { useState, useEffect } from "react";
import { getPortfolio } from "../services/api";
import { profile as defaultProfile } from "../data/profile";
import {
  featuredProjects as defaultFeaturedProjects,
  otherProjects as defaultOtherProjects,
  figmaDesigns as defaultFigmaDesigns,
  certificates as defaultCertificates,
} from "../data/projects";
import { capabilities as defaultCapabilities } from "../data/capabilities";

export function usePortfolioData() {
  const [data, setData] = useState({
    profile: defaultProfile,
    featuredProjects: defaultFeaturedProjects,
    otherProjects: defaultOtherProjects,
    figmaDesigns: defaultFigmaDesigns,
    certificates: defaultCertificates,
    capabilities: defaultCapabilities,
    experience: [],
    education: [],
    skills: [],
    loading: true,
    error: null,
  });

  useEffect(() => {
    let isMounted = true;

    async function load() {
      try {
        const res = await getPortfolio();
        if (!isMounted) return;

        if (res) {
          setData({
            profile: {
              ...defaultProfile,
              ...(res.profile || {}),
              photo: res.profile?.photoUrl || defaultProfile.photo,
              email: res.profile?.email || defaultProfile.email,
              github: res.profile?.githubUrl || defaultProfile.github,
              linkedin: res.profile?.linkedinUrl || defaultProfile.linkedin,
            },
            featuredProjects:
              res.featuredProjects && res.featuredProjects.length > 0
                ? res.featuredProjects.map((p) => ({
                    ...p,
                    id: p.slug || p._id || p.id,
                    tech: p.technologies || p.tech || [],
                    capabilities: p.capabilities || [],
                  }))
                : defaultFeaturedProjects,
            otherProjects:
              res.otherProjects && res.otherProjects.length > 0
                ? res.otherProjects.map((p) => ({
                    ...p,
                    id: p.slug || p._id || p.id,
                    tech: p.technologies || p.tech || [],
                  }))
                : defaultOtherProjects,
            figmaDesigns:
              res.designs && res.designs.length > 0
                ? res.designs.map((d) => ({
                    ...d,
                    id: d.slug || d._id || d.id,
                    image: d.previewImage || d.image,
                  }))
                : defaultFigmaDesigns,
            certificates:
              res.certifications && res.certifications.length > 0
                ? res.certifications.map((c) => ({
                    ...c,
                    id: c._id || c.id,
                    url: c.url || c.verificationUrl || c.imageUrl,
                  }))
                : defaultCertificates,
            capabilities: defaultCapabilities,
            experience: res.experience || [],
            education: res.education || [],
            skills: res.skills || [],
            loading: false,
            error: null,
          });
        }
      } catch (err) {
        console.warn("[portfolio] API load failed, using resilient local fallback:", err.message);
        if (isMounted) {
          setData((prev) => ({ ...prev, loading: false, error: err.message }));
        }
      }
    }

    load();

    return () => {
      isMounted = false;
    };
  }, []);

  return data;
}
