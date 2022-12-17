package com.ungalthedal.api.service.admin.general;

import com.ungalthedal.api.domain.admin.general.WeekDays;
import com.ungalthedal.api.domain.admin.general.WeekDaysView;
import com.ungalthedal.api.repository.admin.general.IWeekDaysRepository;
import com.ungalthedal.api.repository.admin.general.IWeekDaysViewRepository;
import com.ungalthedal.api.service.abstraction.admin.general.IWeekDaysService;
import org.hibernate.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class WeekDaysService implements IWeekDaysService {
    IWeekDaysRepository weekDaysRepository;
    IWeekDaysViewRepository weekDaysViewRepository;

    @PersistenceContext
    EntityManager entityManager;

    @Autowired
    WeekDaysService(IWeekDaysRepository weekDaysRepository, IWeekDaysViewRepository weekDaysViewRepository) {
        this.weekDaysRepository = weekDaysRepository;
        this.weekDaysViewRepository = weekDaysViewRepository;
    }

    @Override
    public List<WeekDaysView> getList(WeekDaysView weekDaysView) {
        Session session = entityManager.unwrap(Session.class);
        CriteriaBuilder criteriaBuilder = session.getCriteriaBuilder();
        CriteriaQuery<WeekDaysView> criteriaQuery = criteriaBuilder.createQuery(WeekDaysView.class);
        Root<WeekDaysView> root = criteriaQuery.from(WeekDaysView.class);
        if ((weekDaysView.getNme() == null || weekDaysView.getNme().trim().length() < 1) && weekDaysView.getActive() == null)
            criteriaQuery.select(root);
        if (weekDaysView.getNme() != null && weekDaysView.getNme().trim().length() > 0)
            criteriaQuery.select(root).where(criteriaBuilder.equal(root.get("nme"), weekDaysView.getNme()));
        if (weekDaysView.getActive() != null)
            criteriaQuery.select(root).where(criteriaBuilder.equal(root.get("active"), weekDaysView.getActive()));
        return session.createQuery(criteriaQuery).list().stream().sorted(Comparator.comparing(WeekDaysView::getNme)).collect(Collectors.toList());
    }

    @Override
    public WeekDays getById(Long id) {
        return this.weekDaysRepository.getWeekDaysById(id);
    }

    @Override
    public WeekDays getByNme(WeekDays weekDays) {
        return this.weekDaysRepository.getWeekDaysByNme(weekDays.getNme());
    }

    @Override
    public WeekDays save(WeekDays weekDays) {
        return this.weekDaysRepository.save(weekDays);
    }

    @Override
    public void delete(WeekDays weekDays) {
        this.weekDaysRepository.delete(weekDays);
    }
}
